from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path("getproducts/", views.getProducts, name="get-products"),
    path("register/", views.register, name="register"),
    path("getproduct/<str:pk>/", views.getProduct, name="get-product"),
    path("update/<str:pk>/", views.update, name="update-product"),
    path("delete/<str:pk>/", views.delete, name="delete-product"),
    path("search/<str:querie>/", views.search, name="search-product"),
]
