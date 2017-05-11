from rest_framework.generics import ListAPIView

from .serializers import ListSerializers, CardSerializer
from .models import List, Card

class ListApi(ListAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializers

class CardApi(ListAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer