from rest_framework.viewsets import ModelViewSet

from .serializers import ListSerializers, CardSerializer
from .models import List, Card

class ListViewSet(ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializers

class CardViewSet(ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer