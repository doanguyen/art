from django.http import HttpResponse
from django.urls import path

from art.views import artworks_list_view, artwork_object_view, artwork_create_view


def home(request):
    return HttpResponse()


urlpatterns = [
    path("", home, name="home"),
    path("artworks", artworks_list_view, name="artworks"),
    path("artwork/<ConstituentID>", artwork_object_view, name="artwork"),
    path("artwork", artwork_create_view, name="artwork_create"),
]
