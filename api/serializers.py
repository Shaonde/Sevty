from rest_framework import serializers
from .models import Excuse

class ExcuseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excuse
        fields = ("id","host","subject","description","validations","created_at","key")

class CreateExcuses(serializers.ModelSerializer):
    class Meta:
        model = Excuse
        fields = ("host","subject","description")

class ValiderExcuses(serializers.ModelSerializer):
    key = serializers.CharField(validators=[])
    class Meta:
        model = Excuse
        fields = ("id","key")