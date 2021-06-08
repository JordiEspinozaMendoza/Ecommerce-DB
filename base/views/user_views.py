from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection

cursor = connection.cursor()


@api_view(["GET"])
def getUsers(request):
    try:
        cursor.execute("SELECT * FROM USERS")
        r = cursor.fetchall()
        users = []
        for user in r:
            users.append(
                {
                    "id": user[0],
                    "name": user[1],
                    "lastName": user[2],
                    "email": user[3],
                    "password": user[4],
                }
            )
        return Response(users)
    except Exception as e:
        print(str(e))
        return Response("error")


@api_view(["POST"])
def register(request):
    try:
        data = request.data
        cursor.execute(
            f"INSERT INTO USERS VALUES(DEFAULT, '{data['name']}', '{data['lastname']}', '{data['email']}', '{data['password']}',0)"
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
            f"UPDATE USERS SET nameUser = '{data['name']}', lastUser = '{data['lastname']}', mailUser = '{data['email']}', passUser = '{data['password']}' WHERE idUser={pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM USERS WHERE idUser = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
