from rest_framework.serializers import ModelSerializer

from art.models import Artwork, Artist


class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        exclude = []


class ArtworkSerializer(ModelSerializer):
    ConstituentID = ArtistSerializer(required=False, many=True)

    class Meta:
        model = Artwork
        exclude = []
