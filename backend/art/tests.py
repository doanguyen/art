from random import uniform
from unittest import skip

import factory
from django.test import TestCase
from django.urls import reverse
from factory.django import DjangoModelFactory
from rest_framework.test import APIClient

from art.models import Artwork


class ArtworkFactory(DjangoModelFactory):
    Title = factory.Faker("name")
    ObjectID = factory.Sequence(lambda n: n + 2000)
    Height = factory.Sequence(lambda n: uniform(100, 200))
    Width = factory.Sequence(lambda n: uniform(100, 200))

    class Meta:
        model = Artwork


class BaseArtTestCase(TestCase):
    client_class = APIClient

    def setUp(self) -> None:
        self.artworks_list = ArtworkFactory.create_batch(5)


class ArtworksTestCase(BaseArtTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.home_url = reverse("home")
        self.artworks_list_url = reverse("artworks")

    def test_it_should_display_the_homepage(self):
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 200)

    def test_it_should_display_the_artworks_view(self):
        response = self.client.get(self.artworks_list_url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Title", response.json()["results"][0].keys())


class CreateArtworkTestCase(BaseArtTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.artwork_to_create = {
            "Title": "New artwork",
            "Artist": "New artist",
            "BeginDate": "1990",
            "ObjectID": 2000,
            "Height": 19.20,
            "Width": 21,
            "AccessionNumber": "AccessionNumber",
            "ArtistBio": "ArtistBio",
            "Cataloged": "Cataloged",
            "Classification": "Classification",
            "CreditLine": "Creditline",
            "Date": "20/10/1991",
            "DateAcquired": "2/1/2222",
            "Department": "Department",
            "Dimensions": "Dimensions",
            "Gender": "Male",
            "Medium": "Medium",
            "Nationality": "France",
            "ThumbnailURL": "http://url",
            "URL": "http://url",
        }
        self.url = reverse("artworks")

    def test_it_should_be_able_to_create_an_complete_artwork(self):
        response = self.client.post(self.url, self.artwork_to_create)
        self.assertEqual(response.status_code, 201)

    @skip("Deprecated. The model has changed")
    def test_it_should_not_be_able_to_create_an_incomplete_artwork(self):
        incomplete_artwork = self.artwork_to_create.copy()
        incomplete_artwork.pop("ConstituentID", None)
        response = self.client.post(self.url, incomplete_artwork)
        self.assertEqual(response.status_code, 400)
        self.assertIn("ConstituentID", response.json().keys())
        self.assertNotIn("This field is required.", response.json()["ConstituentID"])


class SingleArtworkTestCase(BaseArtTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.artwork = self.artworks_list[0]
        self.url = reverse("artwork_object", kwargs={"id": self.artwork.id})

    def test_it_should_be_able_to_retrieve_the_artwork_with_id(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("ConstituentID", response.json())

    def test_it_should_be_able_to_update_an_artwork_with_id(self):
        obj = {"Title": "The new Title"}
        response = self.client.put(self.url, obj, format="json")
        self.assertEqual(
            response.status_code, 200, "it should be able to update partially"
        )
        self.assertEqual(response.json()["Title"], obj["Title"])

    def test_it_should_be_able_to_delete_an_artwork_with_constituent_id(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 204)

        response_after_delete = self.client.get(self.url)
        self.assertEqual(response_after_delete.status_code, 404, "It should be deleted")
