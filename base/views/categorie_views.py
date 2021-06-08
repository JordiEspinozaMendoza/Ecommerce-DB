from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection

cursor = connection.cursor()

@api_view(["GET"])
def getUsers(request):
    try:
        cursor.execute("SELECT * FROM CATEGORIES")
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
            f"INSERT INTO CATEGORIES (nameCategory, desCategory) VALUES('{data['category']}', '{data['description']}')"
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
            f"UPDATE CATEGORIES SET nameCategories = '{data['category']}', desCategory = '{data['description']}' WHERE idCategory = {pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))

@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM CATEGORIES WHERE idCategory = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))