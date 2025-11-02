from .serializer import ProductSerializer , ProductDetailSerializer , CartSerializer , CartItemSerializer , SimpleCartSerializer , UserSerializer
from .models import Product , Cart ,CartItem , Transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
import uuid
from decimal import Decimal
import paypalrestsdk
from django.conf import settings

BASE_URL = "http://localhost:5173"

paypalrestsdk.configure({
    "mode": settings.PAYPAL_MODE , # 'sandbox' or 'live'
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET
})


@api_view(['GET'])
def productView(request):
    products  = Product.objects.all()
    serializer = ProductSerializer(products , many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detailedProductView(request , slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data)

@api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")

        cart , created = Cart.objects.get_or_create(cart_code=cart_code)
        product = Product.objects.get(id=product_id)

        cartItem , created = CartItem.objects.get_or_create(cart=cart , product=product)
        serializer = CartItemSerializer(cartItem)
        return Response({"data": serializer.data , "message": "Item Added to Cart Back-End"})
    except Exception as e:
        return Response({"error": str(e)} , status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    cartItem_exists_in_cart  = CartItem.objects.filter(cart=cart , product=product).exists()
    return Response({"product_in_cart": cartItem_exists_in_cart})

@api_view(['GET'])
def get_cart_number_counter(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)

@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['PATCH'])
def update_quantity(request):
    try:
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)

        cartItem = CartItem.objects.get(id = item_id)
        cartItem.quantity = quantity
        cartItem.save()
        serializer = CartItemSerializer(cartItem)
        return Response({"data": serializer.data , "Message": "CartItem SuccessFully Updated!"} , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error" : str(e)} , status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_cartItem(request):
    item_id = request.data.get("item_id")
    cartItem = CartItem.objects.get(id=item_id)
    cartItem.delete()
    return Response({"message": "CartItem Successfully Deleted!"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username" : user.username})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_userInfo(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def initiate_payment(request):
    if request.method == 'POST' and request.user.is_authenticated:
        tx_ref = str(uuid.uuid4())
        user = request.user
        cart_code = request.data.get("cart_code")
        cart = Cart.objects.get(cart_code=cart_code)
        amount = sum([item.product.price * item.quantity for item in cart.items.all()])
        tax = Decimal("4.00")
        total_amount = amount + tax

        payment = paypalrestsdk.Payment({
            "intent" : "sale",
            "payer" : {
                "payment_method" : "paypal",
            },
            "redirect_urls" : {
                "return_url" : f"{BASE_URL}/payment-status?paymentstatus=success&ref={tx_ref}",
                "cancel_url" : f"{BASE_URL}/payment-status?paymentstatus=cancel",
            },
            "transactions" : [{
                "item_list" : {
                    "items" : [{
                        "name" : "Cart Items", 
                        "sku" : "cart",
                        "price" : str(total_amount),
                        "currency" : 'USD',
                        "quantity" : 1,
                    }]
                },
                "amount" : {
                    "total" : str(total_amount),
                    "currency" : "USD",
                },
                "description" : "Payment for CartItem"
            }]
        })
        print("pay_id" , payment)

        transaction , created = Transaction.objects.get_or_create(
            ref = tx_ref,
            user = user,    
            cart = cart, 
            amount = total_amount,
            status = 'pending',
        )

        if payment.create():
            for link in payment.links:
                if link.rel == 'approval_url':
                    approval_url = str(link.href)
                    return Response({"approval_url" : approval_url})
                
        else:
            return Response({"error" : payment.error} , status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def paypal_payment_callback(request):
        payment_id = request.query_params.get("paymentId")
        payer_id = request.query_params.get("PayerID")
        ref = request.query_params.get("ref")

        user = request.user
        print("refff" , ref)

        transaction = Transaction.objects.get(ref=ref)

        if payment_id and payer_id : 
            payment = paypalrestsdk.Payment.find(payment_id)

            transaction.status = 'completed'
            transaction.save()
            cart = transaction.cart
            cart.paid = True
            cart.user = user
            cart.save()

            return Response({"message" : "Payment Successfull" , "subMessage" : "You have successfully made payment for the items you purchased 😍"})

        else:
            return Response({"error" : "Invalid Payment Details"} , status=status.HTTP_400_BAD_REQUEST)

