from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
    ListAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from art.models import Artwork, Artist
from art.serializers import ArtworkSerializer, ArtistSerializer


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 24
    page_size_query_param = "page_size"
    max_page_size = 200


class ArtworksListView(ListCreateAPIView):
    """Returns list of artworks or create one
    Endpoint: /api/artworks
    """

    serializer_class = ArtworkSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        query_params = self.request.query_params
        keyword = query_params.get("keyword", default=None)
        nationality = query_params.get("nationality", default=None)
        artist = query_params.get("artist", default=None)
        queryset = Artwork.objects.prefetch_related("ConstituentID").all()

        if keyword:
            queryset = queryset.filter(Title__icontains=keyword)
        if nationality:
            queryset = queryset.filter(ConstituentID__Nationality=nationality)
        if artist:
            queryset = queryset.filter(ConstituentID__DisplayName__icontains=artist)
        return queryset


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


class ArtistListView(ListAPIView):
    """Returns list of artists
    Endpoint: /api/artists
    """

    serializer_class = ArtistSerializer
    pagination_class = LargeResultsSetPagination

    queryset = Artist.objects.order_by("-BeginDate").all()


artist_list_view = ArtistListView.as_view()


class ArtistNationalityView(APIView):
    """Returns list of different nationality
    Endpoint: /api/artists/nationality
    """

    def get(self, request):
        values = Artist.objects.values_list("Nationality", flat=True).distinct()
        return Response([value for value in values if value])


artist_nationality_view = ArtistNationalityView.as_view()
