from django.db import models
from django.utils.text import slugify
from django.conf import settings

class Product(models.Model):
    CATEGORY = (("Electronics" , "Electronics"), 
                ("Clothing" , "Clothing"),
                ("Grocery", "Grocery"),
                ("Home & Kitchen", "Home & Kitchen"),
                )
    
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100 , null=True , blank=True)
    image = models.ImageField(upload_to='img' , null=True , blank=True)
    description = models.TextField(max_length=1000 , null=True , blank=True)
    price = models.DecimalField(max_digits=10 , decimal_places=2, null=True , blank=True)
    category = models.CharField(max_length=50 , choices=CATEGORY , null=True , blank=True)

    def __str__(self):
        return self.name
    
        
    def save(self , *args , **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)
            unique_slug = self.slug
            counter = 1
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{self.slug}--{counter}"
                counter +=1
            self.slug = unique_slug

        super().save(*args , **kwargs)

class Cart(models.Model):
    cart_code = models.CharField(max_length=11 , unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE , null=True , blank=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.cart_code}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart , related_name='items' , on_delete=models.CASCADE )
    product = models.ForeignKey(Product , on_delete=models.CASCADE )
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} * {self.product.name} in {self.cart.cart_code}"
    
class Transaction(models.Model):
    ref = models.CharField(max_length=25 , unique=True)
    cart = models.ForeignKey(Cart , on_delete=models.CASCADE , related_name='transactions')
    amount = models.DecimalField(max_digits=10 , decimal_places=2)
    currency = models.CharField(max_length=10 , default='USD')
    status = models.CharField(max_length=15 , default='Pending')
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE , null=True , blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"Transaction {self.ref} - {self.status}"
