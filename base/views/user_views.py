from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
from base.serializers import userSerializer
import os, sys
from base.validators import hasNumbers


@api_view(["GET"])
def getUsers(request):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM USUARIOS")
        r = cursor.fetchall()
        users = userSerializer(r, True)
        return Response(users)
    except Exception as e:
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return Response(str(e))


@api_view(["POST"])
def register(request):
    try:
        cursor = connection.cursor()

        data = request.data
        # print(data)
        cursor.execute(
            f"SELECT idUsuario, correoUsuario FROM USUARIOS WHERE  correoUsuario='{data['email']}'"
        )
        r = cursor.fetchone()
        if hasNumbers(data["name"]) or hasNumbers(data["lastName"]):
            content = {"detail": "El nombre y apellido no llevan números"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
            
        if r != None:
            content = {"detail": f"El correo {r[1]} ya esta en uso"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if len(data["password"]) < 5:
            content = {"detail": "La contraseña es muy corta, intente con otra"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"INSERT INTO USUARIOS VALUES(DEFAULT, '{data['name']}', '{data['lastName']}', '{data['email']}', '{data['password']}',0)"
        )
        # Last id inserted
        last_id = cursor.lastrowid
        # We get the user info
        cursor.execute(f"SELECT * FROM USUARIOS WHERE idUsuario = {last_id}")
        # We take the object
        r = cursor.fetchone()
        # Serializer
        user = userSerializer(r, many=False)
        return Response(user)
    except Exception as e:
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    try:
        cursor = connection.cursor()
        data = request.data
        cursor.execute(
            f"SELECT * FROM USUARIOS WHERE correoUsuario = '{data['email']}' AND passwordUsuario = '{data['password']}'"
        )
        r = cursor.fetchone()
        if r != None:
            user = userSerializer(r, many=False)
            return Response(user)
        else:
            content = {"detail": "Usuario o contraseña invalidos"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        cursor.close()
        print(str(e))
        content = {"detail": "Usuario o contraseña invalidos"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update(request, pk):
    try:
        cursor = connection.cursor()
        data = request.data
        cursor.execute(
            f"SELECT idUsuario, correoUsuario FROM USUARIOS WHERE correoUsuario='{data['email']}' AND idUsuario <>{int(pk)};"
        )
        r = cursor.fetchone()
        if hasNumbers(data["name"]) or hasNumbers(data["lastName"]):
            content = {"detail": "El nombre y apellido no llevan números"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if r != None:
            content = {"detail": f"El correo {r[1]} ya esta en uso"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if len(data["password"]) < 5:
            content = {"detail": "La contraseña es muy corta, intente con otra"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        cursor.execute(
            f"UPDATE USUARIOS SET nombreUsuario = '{data['name']}', apellidoUsuario = '{data['lastName']}', correoUsuario = '{data['email']}', passwordUsuario = '{data['password']}' WHERE idUsuario={pk}"
        )
        cursor.execute(f"SELECT * FROM USUARIOS WHERE idUsuario ={pk};")
        r = cursor.fetchone()
        user = userSerializer(r, many=False)
        cursor.close()
        return Response(user)
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
        cursor.execute(f"DELETE FROM USUARIOS WHERE idUsuario = {int(pk)}")
        cursor.close()
        return Response("200")
    except Exception as e:
        print(str(e))
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def changePrivilegies(request, pk):
    try:
        cursor = connection.cursor()
        data = request.data

        if data["isAdmin"] == True:
            isAdmin = 1
        else:
            isAdmin = 0

        cursor.execute(
            f"UPDATE USUARIOS SET esAdmin = {isAdmin} WHERE idUsuario = {int(pk)}"
        )
        cursor.close()
        return Response("200")
    except Exception as e:
        print(str(e))
        cursor.close()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
