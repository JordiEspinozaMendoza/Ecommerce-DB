from django.urls import path
from base.views import orders_views as views

urlpatterns = [
    path("createorder/", views.createOrder, name="create-order"),
]
