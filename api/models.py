from ipaddress import ip_address
from django.db import models
import random

def RandomKey():
    while True:
        key = random.randint(0,2147483646)
        if Excuse.objects.filter(key=key).count() == 0:
            break
    return key
# Create your models here.
class Excuse(models.Model):
    host = models.CharField(max_length=50, blank=False)
    subject = models.CharField(max_length=100, default="", blank=False)
    description = models.CharField(max_length=350, default="", blank=True)
    validations = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    key = models.IntegerField(null=False,unique=True,default=RandomKey)
    ip_address = models.GenericIPAddressField(protocol='both', unpack_ipv4=False)

    def __str__(self):
        return f"ID : {self.id} , Apologist : {self.host} , Subject : {self.subject}"