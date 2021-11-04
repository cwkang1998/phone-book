from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=60)
