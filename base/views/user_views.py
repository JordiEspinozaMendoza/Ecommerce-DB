from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
from base.serializers import userSerializer
import os,sys
cursor = connection.cursor()
    
@api_view(["GET"])
def getUsers(request):
    try:
        cursor.execute("SELECT * FROM USUARIOS")
        r = cursor.fetchall()
        users = userSerializer(r)
        return Response(users)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return Response(str(e))

@api_view(["POST"])
def register(request):
    try:
        data = request.data
        print(data)
        cursor.execute(
            f"SELECT idUsuario, correoUsuario FROM USUARIOS WHERE  correoUsuario='{data['email']}'"
        )
        r =  cursor.fetchone()
        print(r)
        if r != None:
            content = {'detail': f"El correo {r[1]} ya esta en uso"}
            return Response(content,status=status.HTTP_400_BAD_REQUEST)
        
        if len(data['password'])<5:
            content = {'detail': "La contraseña es muy corta, intente con otra"}
            return Response(content,status=status.HTTP_400_BAD_REQUEST)
        cursor.execute(
            f"INSERT INTO USUARIOS VALUES(DEFAULT, '{data['name']}', '{data['lastName']}', '{data['email']}', '{data['password']}',0)"
        )
        #Last id inserted
        last_id = cursor.lastrowid
        #We get the user info
        cursor.execute(f"SELECT * FROM USUARIOS WHERE idUsuario = {last_id}")
        #We take the object
        r=cursor.fetchone()
        #Serializer
        user = userSerializer(r, many=False)
        return Response(user)
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return Response(str(e))

@api_view(["POST"])
def login(request):
    try:
        data = request.data
        cursor.execute(
            f"SELECT * FROM USUARIOS WHERE correoUsuario = '{data['email']}' AND passwordUsuario = '{data['password']}'"
        )
        r = cursor.fetchone()
        if r!=None:
            user = userSerializer(r,many=False)
            return Response(user)       
        else:
            content = {'detail': 'Usuario o contraseña invalidos'}
            return Response(content,status=status.HTTP_400_BAD_REQUEST)        
    except Exception as e:
        print(str(e))
        content = {'detail': 'Usuario o contraseña invalidos'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)  
@api_view(["PUT"])
def update(request, pk):
    try:
        data = request.data
        cursor.execute(
            f"UPDATE USUARIOS SET nombreUsuario = '{data['name']}', apellidoUsuario = '{data['lastname']}', correoUsuario = '{data['email']}', correoUsuario = '{data['password']}' WHERE idUsuario={pk}"
        )
        r = cursor.fetchone()
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
        
@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM USUARIOS WHERE idUsuario = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
