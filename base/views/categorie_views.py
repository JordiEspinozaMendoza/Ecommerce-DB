from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection

cursor = connection.cursor()


@api_view(["GET"])
def getCategories(request):
    try:
        cursor.execute("SELECT * FROM CATEGORIAS")
        r = cursor.fetchall()
        return Response(r)
    except Exception as e:
        print(str(e))


@api_view(["POST"])
def register(request):
    try:
        # INSERT INTO table_name (column1, column2, column3, ...)
        # VALUES (value1, value2, value3, ...);
        data = request.data
        cursor.execute(
            f"INSERT INTO CATEGORIAS (nombreCategoria, descripcionCategoria) VALUES('{data['name']}', '{data['description']}')"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["PUT"])
def update(request, pk):
    try:
        data = request.data
        cursor.execute(
            f"UPDATE CATEGORIAS SET nombreCategoria = '{data['category']}', descripcionCategoria = '{data['description']}' WHERE idCategoria = {pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM CATEGORIAS WHERE idCategoria = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
