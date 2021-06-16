from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection

cursor = connection.cursor()


@api_view(["GET"])
def getProducts(request):
    try:
        cursor.execute(
            "SELECT PRODUCTS.idProduct,PRODUCTS.idCategory,PRODUCTS.nameProduct,PRODUCTS.desProduct, PRODUCTS.priceProducto, PRODUCTS.Existing , CATEGORIES.nameCategory FROM PRODUCTS, CATEGORIES"
        )
        r = cursor.fetchall()
        return Response(r)
    except Exception as e:
        return Response(str(e))


@api_view(["POST"])
def register(request):
    try:
        # INSERT INTO table_name (column1, column2, column3, ...)
        # VALUES (value1, value2, value3, ...);
        data = request.data
        if(isinstance(data['price'],str)):
            return Response('El precio debe de ser un numero', status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"INSERT INTO PRODUCTS (nameProduct, desProduct, priceProducto,Existing) VALUES('{data['name']}', '{data['description']}', '{data['price']}','{data['countInStock']}')"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["PUT"])
def update(request, pk):
    try:
        data = request.data
        if(isinstance(data['price'],str)):
            return Response('El precio debe de ser un numero', status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"UPDATE PRODUCTS SET nameProduct = '{data['product']}', desProducto = '{data['description']}', priceProduct = '{data['price']}', Existing = '{data['existing']}' WHERE idProduct={pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM PRODUCTS WHERE idProduct = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
