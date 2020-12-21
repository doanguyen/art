import csv
from os.path import isfile
from pathlib import Path

from django.core.management import BaseCommand, CommandError

from art.models import Artwork


def clean(str) -> str:
    return str.replace("(", "").replace(")", "")


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
        ConstituentModel = Artwork.ConstituentID.through
        consituents = []
        for id, row in enumerate(data[1:]):
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

            if "," in ConstituentID:
                ConstituentID = clean(ConstituentID).split(",")
            if not ConstituentID:
                self.stdout.write(f"Passing: {id}")
                continue
            if isinstance(ConstituentID, list):
                for c in ConstituentID:
                    if c:
                        consituents.append(ConstituentModel(artwork_id=id, artist_id=c))
            elif isinstance(ConstituentID, int) and ConstituentID:
                consituents.append(
                    ConstituentModel(artwork_id=id, artist_id=ConstituentID)
                )
            else:
                pass
        ConstituentModel.objects.bulk_create(consituents, ignore_conflicts=True)
        # artwork = Artwork(
        #     Title=Title,
        #     Date=Date,
        #     Medium=Medium,
        #     Dimensions=Dimensions,
        #     CreditLine=CreditLine,
        #     AccessionNumber=AccessionNumber,
        #     Classification=Classification,
        #     Department=Department,
        #     DateAcquired=DateAcquired,
        #     Cataloged=Cataloged,
        #     ObjectID=ObjectID,
        #     URL=URL,
        #     ThumbnailURL=ThumbnailURL,
        #     Height=float(Height if len(Height) > 0 else 0),
        #     Width=float(Width if len(Width) > 0 else 0),
        # )
        # artworks.append(artwork)
        # artwork.save()
        # try:
        #     if isinstance(ConstituentID, list):
        #         for c in ConstituentID:
        #             if c:
        #                 artwork.ConstituentID.add(c)
        #     elif isinstance(ConstituentID, str) or isinstance(ConstituentID, int) and ConstituentID:
        #         artwork.ConstituentID.add(ConstituentID)
        #     else:
        #         pass
        # except:
        #     pass
        # Artwork.objects.bulk_create(artworks)
        self.stdout.write(self.style.SUCCESS("Import succeed"))
