from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    city = models.CharField(max_length=50 , null=True , blank=True)
    state = models.CharField(max_length=50 , null=True , blank=True)
    address = models.CharField(max_length=50 , null=True , blank=True)
    phone = models.CharField(max_length=10 , null=True , blank=True)

    def __str__(self):
        return self.username
    

