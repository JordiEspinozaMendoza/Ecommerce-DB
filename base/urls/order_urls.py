from django.urls import path
from base.views import orders_views as views

urlpatterns = [
    path("createorder/", views.createOrder, name="create-order"),
    path("getorders/", views.getOrders, name="get-all-orders"),
    path("getorders/<str:pk>/", views.getOrdersById, name="get-orders"),
    path("getorder/<str:pk>/", views.getOrderById, name="get-order"),
    path("update/<str:pk>/", views.update, name="update-order"),
]
