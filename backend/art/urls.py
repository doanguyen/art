from django.http import HttpResponse
from django.urls import path

from art.views import artworks_list_view, artwork_object_view, artist_list_view


def home(request):
    return HttpResponse()


urlpatterns = [
    path("", home, name="home"),
    path("artworks", artworks_list_view, name="artworks"),
    path("artworks/<id>", artwork_object_view, name="artwork_object"),
    path("artists", artist_list_view, name="artists"),
]
