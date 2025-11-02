from django.urls import path
from .import views

urlpatterns = [
    path('products/' , views.productView , name='products'),
    path('product_detail/<slug:slug>/' , views.detailedProductView , name='product_detail'),
    path('add_item/', views.add_item , name='add_item'),
    path('product_in_cart/' , views.product_in_cart , name='product_in_cart'),
    path('get_cart_number_counter/', views.get_cart_number_counter , name='get_cart_number_counter'),
    path('get_cart/' , views.get_cart , name='get_cart'),
    path('update_quantity/' ,views.update_quantity , name='update_quantity'),
    path('delete_cartitem/' , views.delete_cartItem , name='delete_cartitem'),
    path('get_username/' , views.get_username , name='get_username'),
    path('get_userInfo/' , views.get_userInfo , name="get_userInfo"),
    path('initiate_payment/' , views.initiate_payment , name='initiate_payment'),
    path('paypal_payment_callback/' , views.paypal_payment_callback , name='paypal_payment_callback'),
]
