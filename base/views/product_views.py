from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
from base.serializers import productSerializer
import os, sys
import cloudinary


@api_view(["GET"])
def getProducts(request):
    try:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT PRODUCTOS.idProducto,PRODUCTOS.idCategoria,PRODUCTOS.nombreProducto,PRODUCTOS.descripcionProducto, PRODUCTOS.precioProducto, PRODUCTOS.cantidadStock, PRODUCTOS.imagen,  CATEGORIAS.nombreCategoria FROM PRODUCTOS INNER JOIN CATEGORIAS ON CATEGORIAS.idCategoria = PRODUCTOS.idCategoria ORDER BY idProducto DESC"
        )
        r = cursor.fetchall()
        products = productSerializer(r, many=True)
        cursor.close()
        return Response(products)
    except Exception as e:
        cursor.close()
        print(e)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def search(request, querie):
    try:
        cursor = connection.cursor()
        if querie == "all":
            cursor.execute(
                f"SELECT PRODUCTOS.idProducto,PRODUCTOS.idCategoria,PRODUCTOS.nombreProducto,PRODUCTOS.descripcionProducto, PRODUCTOS.precioProducto, PRODUCTOS.cantidadStock, PRODUCTOS.imagen,  CATEGORIAS.nombreCategoria FROM PRODUCTOS INNER JOIN CATEGORIAS ON CATEGORIAS.idCategoria = PRODUCTOS.idCategoria ORDER BY idProducto DESC"
            )
        else:
            cursor.execute(
                f"SELECT PRODUCTOS.idProducto,PRODUCTOS.idCategoria,PRODUCTOS.nombreProducto,PRODUCTOS.descripcionProducto, PRODUCTOS.precioProducto, PRODUCTOS.cantidadStock, PRODUCTOS.imagen,  CATEGORIAS.nombreCategoria FROM PRODUCTOS INNER JOIN CATEGORIAS ON CATEGORIAS.idCategoria = PRODUCTOS.idCategoria WHERE PRODUCTOS.nombreProducto LIKE '%{querie}%' ORDER BY idProducto DESC"
            )
        r = cursor.fetchall()
        products = productSerializer(r, many=True)
        cursor.close()
        return Response(products)
    except Exception as e:
        cursor.close()
        print(e)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getProduct(request, pk):
    try:
        cursor = connection.cursor()
        cursor.execute(
            f"SELECT PRODUCTOS.idProducto,PRODUCTOS.idCategoria,PRODUCTOS.nombreProducto,PRODUCTOS.descripcionProducto, PRODUCTOS.precioProducto, PRODUCTOS.cantidadStock, PRODUCTOS.imagen, CATEGORIAS.nombreCategoria FROM PRODUCTOS INNER JOIN CATEGORIAS ON CATEGORIAS.idCategoria = PRODUCTOS.idCategoria WHERE PRODUCTOS.idProducto = {int(pk)}"
        )
        r = cursor.fetchone()
        products = productSerializer(r, many=False)
        cursor.close()
        return Response(products)
    except Exception as e:
        cursor.close()
        print(e)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def register(request):
    try:
        cursor = connection.cursor()

        data = request.data
        image = request.FILES.get("image")
        reponseCloudinary = cloudinary.uploader.upload(image)
        print(data["price"])
        if type(data["price"]) == "str":
            content = {"detail": "El precio debe ser un numero"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"INSERT INTO PRODUCTOS (nombreProducto, descripcionProducto, precioProducto,cantidadStock, imagen, idCategoria) VALUES('{data['name']}', '{data['description']}', '{data['price']}','{data['countInStock']}', '{reponseCloudinary['secure_url']}', {data['categorie']})"
        )
        cursor.close()

        return Response("200")
    except Exception as e:
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update(request, pk):
    try:
        cursor = connection.cursor()
        data = request.data
        print(data["updateImage"])

        if data["updateImage"] == "false":
            print(data)
            cursor.execute(
                f"UPDATE PRODUCTOS SET nombreProducto = '{data['name']}', descripcionProducto = '{data['description']}', precioProducto = '{data['price']}', cantidadStock = '{data['countInStock']}', idCategoria = {data['idCategorie']} WHERE idProducto={pk}"
            )
        else:
            print("aaaa")
            image = request.FILES.get("image")
            reponseCloudinary = cloudinary.uploader.upload(image)
            cursor.execute(
                f"UPDATE PRODUCTOS SET nombreProducto = '{data['name']}', descripcionProducto = '{data['description']}', precioProducto = '{data['price']}', cantidadStock = '{data['countInStock']}', idCategoria = {data['idCategorie']},imagen = '{reponseCloudinary['secure_url']}' WHERE idProducto={pk}"
            )
        cursor.close()
        return Response("200")
    except Exception as e:
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM PRODUCTOS WHERE idProducto = {pk}")
        return Response("200")
    except Exception as e:
        cursor.close()
        print(str(e))
        return Response(str(e))


cloudinary.config(
    cloud_name="jordiespinoza",
    api_key="742441269294759",
    api_secret="4V-aSjAYC_Ve3LNbF8Q0rt1eowg",
    secure=True,
)
