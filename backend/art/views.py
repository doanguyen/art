from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from art.models import Artwork
from art.serializers import ArtworkSerializer


class ArtworksListView(ListAPIView):
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()


artworks_list_view = ArtworksListView.as_view()


class ArtworkObjectView(RetrieveUpdateDestroyAPIView):
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()
    lookup_field = "ConstituentID"

    def get_serializer(self, *args, **kwargs):
        kwargs["partial"] = True
        return super().get_serializer(*args, **kwargs)


artwork_object_view = ArtworkObjectView.as_view()


class ArtworkCreateView(CreateAPIView):
    serializer_class = ArtworkSerializer


artwork_create_view = ArtworkCreateView.as_view()
