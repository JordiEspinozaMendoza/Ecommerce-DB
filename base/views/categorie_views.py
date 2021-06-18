from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
from base.serializers import categorieSerializer
import os,sys

@api_view(["GET"])
def getCategories(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM CATEGORIAS")
        r = cursor.fetchall()
        categories = categorieSerializer(r, many=True)
        cursor.close()
        return Response(categories)
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
        # INSERT INTO table_name (column1, column2, column3, ...)
        # VALUES (value1, value2, value3, ...);
        data = request.data
        cursor.execute(
            f"INSERT INTO CATEGORIAS (nombreCategoria, descripcionCategoria) VALUES('{data['name']}', '{data['description']}')"
        )
        cursor.close()
        return Response("200")
    except Exception as e:
        cursor.close()
        print(str(e))
        return Response(str(e))


@api_view(["PUT"])
def update(request, pk):
    try:
        cursor = connection.cursor()
        data = request.data
        cursor.execute(
            f"UPDATE CATEGORIAS SET nombreCategoria = '{data['category']}', descripcionCategoria = '{data['description']}' WHERE idCategoria = {pk}"
        )
        cursor.close()
        return Response("200")
    except Exception as e:
        cursor.close()
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM CATEGORIAS WHERE idCategoria = {pk}")
        cursor.close()
        return Response("200")
    except Exception as e:
        cursor.close()
        print(str(e))
        return Response(str(e))
