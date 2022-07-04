from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("publish", index),
    path("user/<str:users>", index),
    path("random", index),
    path("info", index)
]
