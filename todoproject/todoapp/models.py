from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    time = models.TimeField()
    date = models.DateField()

    def __str__(self):
        return self.title
