from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('medico', 'Médico'),
        ('recepcion', 'Recepcionista'),
    )
    rol = models.CharField(max_length=20, choices=ROLES, default='recepcion')

    def __str__(self):
        return f"{self.username} ({self.rol})"


# Empresa
class Empresa(models.Model):
    ruc = models.CharField(max_length=11, unique=True)
    nombre = models.CharField(max_length=100)
    direccion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


# Paciente
class Paciente(models.Model):
    dni = models.CharField(max_length=8, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    sexo = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Femenino')])
    fecha_nacimiento = models.DateField()
    empresa = models.ForeignKey(Empresa, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


# Médico
class Medico(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    cmp = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.usuario.get_full_name()} - CMP: {self.cmp}"


# Tipo de Examen
class TipoExamen(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


# Examen Médico
class ExamenMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoExamen, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    medico = models.ForeignKey(Medico, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.paciente}"


# Resultado de Examen
class Resultado(models.Model):
    examen = models.OneToOneField(ExamenMedico, on_delete=models.CASCADE)
    observaciones = models.TextField()
    apto = models.BooleanField()

    def __str__(self):
        return f"{'Apto' if self.apto else 'No Apto'} - {self.examen}"


# Cita
class Cita(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField()
    atendido = models.BooleanField(default=False)
    observaciones = models.TextField(blank=True)

    def __str__(self):
        return f"Cita: {self.paciente} - {self.fecha_hora.strftime('%Y-%m-%d %H:%M')}"
