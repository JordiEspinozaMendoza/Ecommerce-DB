from django.db import models
from cloudinary.models import CloudinaryField

from django.contrib.auth.models import User
# Create your models here.

class Categories(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    statusDelete = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Products(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=20)
    prevPrice = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    quantityStock = models.IntegerField()
    quantitySold = models.IntegerField(default=0)
    image = CloudinaryField('image', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL)
    statusDelete = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    number = models.IntegerField()
    postalCode = models.CharField(max_length=10)
    statusDelete = models.BooleanField(default=False)

    def __str__(self):
        return self.city + ' ' + self.street

class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL)
    product = models.ForeignKey(Products, on_delete=models.SET_NULL)
    statusDeliver = models.BooleanField(default=False)
    statusPayment = models.BooleanField(default=False)
    statusDelete = models.BooleanField(default=False)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL)

class OrderItems(models.Model):
    product = models.ForeignKey(Products, on_delete=models.SET_NULL)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL)
    quantity = models.IntegerField()
    total = models.DecimalField(decimal_places=2, max_digits=20)
    statusDelete = models.BooleanField(default=False)

    
