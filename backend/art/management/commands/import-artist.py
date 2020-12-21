import csv
from os.path import isfile
from pathlib import Path

from django.core.management import BaseCommand, CommandError

from art.models import Artist


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("limit", type=int)

    def handle(self, *args, **options):
        limit = options["limit"]
        BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent
        import_file = BASE_DIR / "collection/Artists.csv"
        if not isfile(import_file):
            raise CommandError(f"File {import_file} is not found")
        data = []
        with open(import_file, "r") as csv_file:
            reader = csv.reader(csv_file, delimiter=",")
            for d in reader:
                if len(data) < limit:
                    data.append(d)
        artists = []
        for row in data[1:]:
            (
                ConstituentID,
                DisplayName,
                ArtistBio,
                Nationality,
                Gender,
                BeginDate,
                EndDate,
                WikiQID,
                ULAN,
            ) = row

            artists.append(
                Artist(
                    ConstituentID=ConstituentID,
                    DisplayName=DisplayName,
                    ArtistBio=ArtistBio,
                    Nationality=Nationality,
                    Gender=Gender,
                    BeginDate=BeginDate,
                    EndDate=EndDate,
                    WikiQID=WikiQID,
                    ULAN=ULAN,
                )
            )
        Artist.objects.bulk_create(artists)

        self.stdout.write(self.style.SUCCESS("Import succeed"))
