from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.



class Process(models.Model):
    name = models.CharField(max_length=5)
    arrival = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5000)])
    burst = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(1000)])
    session = models.IntegerField()
    dependency = models.CharField(max_length=5, null=True)

    def __str__(self) -> str:
        return self.name