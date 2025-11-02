from rest_framework import serializers
from .models import Product , Cart , CartItem
from django.contrib.auth import get_user_model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id" , "name" , "slug" , "image" , "description" , "price" , "category"]

class ProductDetailSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id" , "name" , "slug" , "image" , "description" ,"price", "similar_products"]

    def get_similar_products(self , product):
        similar_products = Product.objects.filter(category = product.category).exclude(id=product.id)
        serializer = ProductSerializer(similar_products , many=True)
        return(serializer.data)
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ["id" , "cart" , "product" , "quantity" , "total"]
    
    def get_total(self , cartItem):
        total = cartItem.product.price * cartItem.quantity
        return total

    
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True , many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id" , "cart_code" , "created_at" , "updated_at" ,"items" , "sum_total" , "num_of_items"]

    def get_sum_total(self , cart):
        sum_total = sum([item.product.price * item.quantity for item in cart.items.all()])
        return sum_total
    
    def get_num_of_items(self , cart):
        num_of_items = sum([item.quantity for item in cart.items.all()])
        return num_of_items

class SimpleCartSerializer(serializers.ModelSerializer):
    cart_number_counter = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id" , "cart_code" , "cart_number_counter"]

    def get_cart_number_counter(self , cart):
        cart_number_counter = sum([item.quantity for item in cart.items.all()])
        return cart_number_counter
    
class NewCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ["id" , "product" , "quantity" , "order_id" , "order_date"]

    def get_order_id(self , cartitem):
        order_id = cartitem.cart.cart_code
        return order_id
    
    def get_order_date(self , cartitem):
        order_date = cartitem.cart.updated_at
        return order_date

    
class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ["id" , "username" ,"first_name" , "last_name" , "email" , "city" , "state" , "address" , "phone" , "items"]

    def get_items(self , user):
        cartitems = CartItem.objects.filter(cart__user=user , cart__paid=True)[:10]
        serializer = NewCartItemSerializer(cartitems , many=True)
        return serializer.data
