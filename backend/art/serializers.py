from rest_framework.serializers import ModelSerializer

from art.models import Artwork


class ArtworkSerializer(ModelSerializer):
    class Meta:
        model = Artwork
        exclude = []
