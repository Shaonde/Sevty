from django.contrib import admin
from .models import Excuse
# Register your models here.

@admin.register(Excuse)
class ExcuseAdmin(admin.ModelAdmin):
    pass