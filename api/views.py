from ipaddress import ip_address
from django.shortcuts import render
from rest_framework import generics, status
from yaml import serialize
from .models import Excuse
from .serializers import ExcuseSerializer, CreateExcuses, ValiderExcuses
from rest_framework.views import APIView
from rest_framework.response import Response
import random

class ExcuseView(generics.ListAPIView):
    queryset = Excuse.objects.all().order_by('-id')
    serializer_class = ExcuseSerializer

class RandomExcuseView(APIView):
    serializer_class = ExcuseSerializer
    def get(self, request, *args, **kwargs):
        last_id = Excuse.objects.all().order_by("-id").values()[0]["id"]
        print(last_id)
        queryset = Excuse.objects.filter(id=random.randint(0,last_id))
        while not queryset.exists():
            queryset = Excuse.objects.filter(id=random.randint(0,last_id))
        return Response(queryset.values(),status=status.HTTP_200_OK)


class GetExcuseView(generics.ListAPIView):
    serializer_class = ExcuseSerializer
    def get_queryset(self, *req):
        return Excuse.objects.filter(host=str(req)[2:-3]).order_by('-id')

    def get(self, request, *args, **kwargs):
        qs = self.get_queryset(request.GET.get("user"))
        return Response(qs.values(),status=status.HTTP_200_OK)

class GetExcuseListView(generics.ListAPIView):
    serializer_class = ExcuseSerializer
    def get_queryset(self, *req):
        return Excuse.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        req = int(request.GET.get("last"))
        if req == 0:
            req = int(Excuse.objects.all().order_by("-id").values()[0]["id"])
        qs = self.get_queryset(req)
        print(f"req : {req}")
        if req > 10:
            return Response(qs.values()[req-10:req],status=status.HTTP_200_OK)
        else:
            return Response(qs.values()[0:req],status=status.HTTP_200_OK)

class UpdateValidationView(APIView):
    serializer_class = ValiderExcuses
    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            key = serializer.data.get("key")
            queryset = Excuse.objects.filter(key=key)
            if not queryset.exists():
                return Response({"msg": f"Excuse not found : {serializer.data}"}, status=status.HTTP_404_NOT_FOUND)
            excuse = queryset[0]

            excuse.validations += 1
            excuse.save(update_fields=["validations"])
            return Response(ExcuseSerializer(excuse).data, status=status.HTTP_200_OK)
        return Response({"Bad Requestss":f"Invalid Data : {serializer.data}"}, status=status.HTTP_400_BAD_REQUEST)

class CreateExcusesView(APIView):
    serializer_class = CreateExcuses
    def get_client_ip(self, request):
        # Getting client Ip
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            host = serializer.data.get("host")
            subject = serializer.data.get("subject")
            description = serializer.data.get("description")
            ip_address = self.get_client_ip(request)
            excuse = Excuse(host=host, subject=subject, description=description, ip_address=ip_address)
            excuse.save()

            return Response(ExcuseSerializer(excuse).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)