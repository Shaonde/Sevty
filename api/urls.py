from django.urls import path
from .views import ExcuseView, CreateExcusesView, UpdateValidationView, GetExcuseView, RandomExcuseView, GetExcuseListView

urlpatterns = [
    path("list/", ExcuseView.as_view()),
    path("create/", CreateExcusesView.as_view()),
    path("validate/", UpdateValidationView.as_view()),
    path("getexcuse", GetExcuseView.as_view()),
    path("random/", RandomExcuseView.as_view()),
    path("listu", GetExcuseListView.as_view())
]
