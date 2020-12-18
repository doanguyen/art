import csv
from os.path import isfile
from pathlib import Path

from django.core.management import BaseCommand, CommandError

from art.models import Artwork


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("limit", type=int)

    def handle(self, *args, **options):
        limit = options["limit"]
        BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent.parent
        import_file = BASE_DIR / "collection/Artworks.csv"
        if not isfile(import_file):
            raise CommandError(f"File {import_file} is not found")
        data = []
        with open(import_file, "r") as csv_file:
            reader = csv.reader(csv_file, delimiter=",")
            for d in reader:
                if len(data) < limit:
                    data.append(d)
        artworks = []
        for row in data[1:]:
            (
                Title,
                Artist,
                ConstituentID,
                ArtistBio,
                Nationality,
                BeginDate,
                EndDate,
                Gender,
                Date,
                Medium,
                Dimensions,
                CreditLine,
                AccessionNumber,
                Classification,
                Department,
                DateAcquired,
                Cataloged,
                ObjectID,
                URL,
                ThumbnailURL,
                Circumference,
                Depth,
                Diameter,
                Height,
                Length,
                Weight,
                Width,
                SeatHeight,
                Duration,
            ) = row

            BeginDate = BeginDate.replace("(", "").replace(")", "")
            EndDate = EndDate.replace("(", "").replace(")", "")
            if " " in BeginDate:
                BeginDate = BeginDate.split(" ")[0]
            if " " in EndDate:
                EndDate = EndDate.split(" ")[0]
            if "," in ConstituentID:
                ConstituentID = ConstituentID.split(",")[0]
            artworks.append(
                Artwork(
                    Title=Title,
                    Artist=Artist,
                    ConstituentID=ConstituentID,
                    ArtistBio=ArtistBio,
                    Nationality=Nationality,
                    BeginDate=BeginDate,
                    EndDate=EndDate,
                    Gender=Gender,
                    Date=Date,
                    Medium=Medium,
                    Dimensions=Dimensions,
                    CreditLine=CreditLine,
                    AccessionNumber=AccessionNumber,
                    Classification=Classification,
                    Department=Department,
                    DateAcquired=DateAcquired,
                    Cataloged=Cataloged,
                    ObjectID=ObjectID,
                    URL=URL,
                    ThumbnailURL=ThumbnailURL,
                    Height=float(Height if len(Height) > 0 else 0),
                    Width=float(Width if len(Width) > 0 else 0),
                )
            )

        Artwork.objects.bulk_create(artworks)
        self.stdout.write(self.style.SUCCESS("Import succeed"))
