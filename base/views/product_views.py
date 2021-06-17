from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
from base.serializers import productSerializer
import os, sys
import cloudinary

cursor = connection.cursor()


@api_view(["GET"])
def getProducts(request):
    try:
        cursor.execute(
            "SELECT PRODUCTOS.idProducto,PRODUCTOS.idCategoria,PRODUCTOS.nombreProducto,PRODUCTOS.descripcionProducto, PRODUCTOS.precioProducto, PRODUCTOS.cantidadStock, PRODUCTOS.imagen FROM PRODUCTOS"
        )
        r = cursor.fetchall()
        print(r)
        products = productSerializer(r, many=True)
        return Response(products)
    except Exception as e:
        return Response(str(e))


@api_view(["POST"])
def register(request):
    try:
        data = request.data
        image = request.FILES.get("image")
        reponseCloudinary = cloudinary.uploader.upload(image)

        if isinstance(int(data["price"]), str):
            content = {"detail": "El precio debe ser un numero"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"INSERT INTO PRODUCTOS (nombreProducto, descripcionProducto, precioProducto,cantidadStock, imagen) VALUES('{data['name']}', '{data['description']}', '{data['price']}','{data['countInStock']}', '{reponseCloudinary['secure_url']}')"
        )
        return Response("200")
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update(request, pk):
    try:
        data = request.data
        if isinstance(int(data["price"]), str):
            return Response(
                "El precio debe de ser un numero", status=status.HTTP_400_BAD_REQUEST
            )
        cursor.execute(
            f"UPDATE PRODUCTOS SET nombreProducto = '{data['product']}', descripcionProducto = '{data['description']}', precioProducto = '{data['price']}', cantidadStock = '{data['existing']}' WHERE idProducto={pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM PRODUCTOS WHERE idProducto = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


cloudinary.config(
    cloud_name="jordiespinoza",
    api_key="742441269294759",
    api_secret="4V-aSjAYC_Ve3LNbF8Q0rt1eowg",
    secure=True,
)
