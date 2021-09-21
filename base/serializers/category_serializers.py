from rest_framework import serializers
from base.models import Categories


class CategoriesSerializer(serializers.ModelSerializer):
    """Serializer for the Categories model."""
    class Meta:
        model = Categories
        fields = "__all__"
