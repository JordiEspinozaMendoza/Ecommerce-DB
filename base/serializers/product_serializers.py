from rest_framework import serializers
from base.models import Products


class ProductSerializer(serializers.ModelSerializer):
    categoryDetails = serializers.CharField(read_only=True)

    class Meta:
        model = Products
        fields = "__all__"
