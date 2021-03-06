from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path("getusers/", views.getUsers, name="get-users"),
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("updateuser/<str:pk>/", views.update, name="update"),
    path("deleteuser/<str:pk>/", views.delete, name="delete"),
    path("changeprivilegies/<str:pk>/", views.changePrivilegies, name="change-privilegies"),
]
