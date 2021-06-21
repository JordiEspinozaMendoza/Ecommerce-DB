from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
import os, sys
from base.serializers import orderSerializer

# cursor = connection.cursor()


@api_view(["POST"])
def createOrder(request):
    data = request.data
    cursor = connection.cursor()
    try:
        print(data["items"])
        cursor.execute(
            f"INSERT INTO ORDENES (idUsuario, pais, ciudad, calle, zipcode, statusEnvio, statusPago) VALUES({data['idUser']}, '{data['country']}','{data['city']}', '{data['street']}', {data['zipcode']}, 'pedido', 'pagado')"
        )
        last_id = cursor.lastrowid

        for product in data["items"]:
            cursor.execute(
                f"INSERT INTO ORDEN_ARTICULO (idProducto, idOrden, cantidad, subTotal, TAX, total) VALUES({product['product']}, {last_id},{product['qty']},{int(product['qty'])*int(product['price'])}, 0, {int(product['qty'])*int(product['price'])})"
            )
        cursor.close()
        return Response("200")

    except Exception as e:
        cursor.close()
        print(e)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        content = {"detail": "Algo ha ocurrido"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getOrdersById(request, pk):
    try:
        cursor = connection.cursor()

        cursor.execute(f"SELECT * FROM ORDENES WHERE idUsuario = {pk} ORDER BY idOrden DESC;")
        r = cursor.fetchall()
        orders = orderSerializer(r, many=True)
        return Response(orders)
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
        # INSERT INTO table_name (column1, column2, column3, ...)
        # VALUES (value1, value2, value3, ...);
        data = request.data
        cursor.execute(
            f"INSERT INTO ORDERS (Suburb, City, Street, ZipCode, ShippingStatus, PayStatus) VALUES('{data['suburb']}', '{data['city']}', '{data['street']}','{data['zipCode']}','{data['shipStatus']}','{data['payStatus']}')"
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
            f"UPDATE ORDERS SET Suburb = '{data['suburb']}', City = '{data['city']}', Street = '{data['street']}', ZipCode = '{data['zipCode']}', ShippingStatus = '{data['shipStatus']}', PayStatus = '{data['payStatus']}' WHERE idOrder={pk}"
        )
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM ORDERS WHERE idOrder = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
