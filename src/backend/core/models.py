from django.db import models

class TimeStampedModel(models.Model):
    """
    Un modelo base abstracto que proporciona campos autocreados
    de fecha de creación y modificación.
    """
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
