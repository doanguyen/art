from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
)
from rest_framework.pagination import PageNumberPagination

from art.models import Artwork
from art.serializers import ArtworkSerializer


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 200


class ArtworksListView(ListCreateAPIView):
    """Returns list of artworks or create one
    Endpoint: /api/artworks
    """

    serializer_class = ArtworkSerializer
    pagination_class = LargeResultsSetPagination
    queryset = Artwork.objects.all()


artworks_list_view = ArtworksListView.as_view()


class ArtworkObjectView(RetrieveUpdateDestroyAPIView):
    """Returns single artwork objects and beable to update/destroy it using its `id`
    Endpoint: /api/artworks/<id>
    """

    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()
    lookup_field = "id"

    def get_serializer(self, *args, **kwargs):
        kwargs["partial"] = True
        return super().get_serializer(*args, **kwargs)


artwork_object_view = ArtworkObjectView.as_view()
