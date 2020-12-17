# Generated by Django 3.1.4 on 2020-12-17 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Artist",
            fields=[
                (
                    "ConstituentID",
                    models.IntegerField(primary_key=True, serialize=False),
                ),
                ("DisplayName", models.CharField(max_length=255)),
                ("ArtistBio", models.CharField(max_length=255)),
                ("Nationality", models.CharField(max_length=255)),
                (
                    "Gender",
                    models.CharField(
                        choices=[("Male", "Male"), ("Female", "Female")], max_length=8
                    ),
                ),
                ("BeginDate", models.IntegerField()),
                ("EndDate", models.IntegerField()),
                ("WikiQID", models.CharField(blank=True, max_length=32, null=True)),
                ("ULAN", models.CharField(blank=True, max_length=32, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Artwork",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Title", models.CharField(max_length=255)),
                ("Artist", models.CharField(max_length=125)),
                ("ConstituentID", models.IntegerField()),
                ("ArtistBio", models.CharField(max_length=255)),
                ("Nationality", models.CharField(max_length=255)),
                ("BeginDate", models.IntegerField()),
                ("EndDate", models.IntegerField(blank=True, null=True)),
                (
                    "Gender",
                    models.CharField(
                        choices=[("Male", "Male"), ("Female", "Female")], max_length=8
                    ),
                ),
                ("Date", models.CharField(max_length=16)),
                ("Medium", models.CharField(max_length=128)),
                ("Dimensions", models.CharField(max_length=128)),
                ("Creditline", models.CharField(max_length=256)),
                ("AccessionNumber", models.CharField(max_length=16)),
                ("Classification", models.CharField(max_length=32)),
                ("Department", models.CharField(max_length=128)),
                ("DateAcquired", models.CharField(max_length=32)),
                ("Cataloged", models.CharField(max_length=16)),
                ("ObjectID", models.IntegerField()),
                ("URL", models.CharField(max_length=128)),
                ("ThumbnailURL", models.CharField(max_length=256)),
                ("Height", models.FloatField()),
                ("Width", models.FloatField()),
            ],
        ),
    ]
