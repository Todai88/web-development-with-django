from rest_framework import serializers

from .models import List, Card

class ListSerializers(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'