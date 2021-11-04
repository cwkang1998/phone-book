from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone_no = PhoneNumberField()

    def __str__(self) -> str:
        return self.name
