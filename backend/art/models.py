from django.db import models
from django.db.models import Manager


class Gender(models.TextChoices):
    MALE = (
        "Male",
        "Male",
    )
    FEMALE = "Female", "Female"


class Artist(models.Model):
    """Represent Artist data"""

    ConstituentID = models.IntegerField(primary_key=True)
    DisplayName = models.CharField(max_length=255)
    ArtistBio = models.CharField(max_length=255)
    Nationality = models.CharField(max_length=255)
    Gender = models.CharField(choices=Gender.choices, max_length=8)
    BeginDate = models.IntegerField()
    EndDate = models.IntegerField()
    WikiQID = models.CharField(max_length=32, null=True, blank=True)
    ULAN = models.CharField(max_length=32, null=True, blank=True)


class Artwork(models.Model):
    """Represent Artworks data"""

    Title = models.CharField(max_length=255)
    Artist = models.CharField(max_length=125)
    ConstituentID = models.IntegerField(db_index=True)
    ArtistBio = models.CharField(max_length=255)
    Nationality = models.CharField(max_length=255)
    BeginDate = models.IntegerField()
    EndDate = models.IntegerField(null=True, blank=True)
    Gender = models.CharField(choices=Gender.choices, max_length=8)
    Date = models.CharField(max_length=16)
    Medium = models.CharField(max_length=128)
    Dimensions = models.CharField(max_length=128)
    CreditLine = models.CharField(max_length=256)
    AccessionNumber = models.CharField(max_length=16)
    Classification = models.CharField(max_length=32)
    Department = models.CharField(max_length=128)
    DateAcquired = models.CharField(max_length=32)
    Cataloged = models.CharField(max_length=16)
    ObjectID = models.IntegerField()
    URL = models.CharField(max_length=128)
    ThumbnailURL = models.CharField(max_length=256)
    Height = models.FloatField(null=True)
    Width = models.FloatField(null=True)

    objects = Manager()
