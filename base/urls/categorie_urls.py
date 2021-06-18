from django.urls import path
from base.views import categorie_views as views

urlpatterns = [
    path("getcategories/", views.getCategories, name="get-categories"),
    path("register/", views.register, name="register"),
]
