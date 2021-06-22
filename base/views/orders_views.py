from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db import connection
import os, sys
from base.serializers import orderSerializer, orderArticleSerializer

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
            cursor.execute(
                f"UPDATE PRODUCTOS SET cantidadStock = cantidadStock - {int(product['qty'])} WHERE idProducto = {product['product']};"
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

        cursor.execute(
            f"SELECT * FROM ORDENES WHERE idUsuario = {pk} ORDER BY idOrden DESC;"
        )
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


@api_view(["GET"])
def getOrders(request):
    try:
        cursor = connection.cursor()

        cursor.execute(f"SELECT * FROM ORDENES ORDER BY idOrden DESC;")
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


@api_view(["GET"])
def getOrderById(request, pk):
    try:
        cursor = connection.cursor()

        cursor.execute(f"SELECT * FROM ORDENES WHERE idOrden ={pk};")
        r = cursor.fetchone()
        orders = orderSerializer(r, many=False)

        cursor.execute(
            f"SELECT ORDEN_ARTICULO.*, PRODUCTOS.nombreProducto, PRODUCTOS.precioProducto, PRODUCTOS.imagen FROM ORDEN_ARTICULO INNER JOIN PRODUCTOS ON PRODUCTOS.idProducto = ORDEN_ARTICULO.idProducto WHERE idOrden ={pk};"
        )
        r = cursor.fetchall()

        items = orderArticleSerializer(r, many=True)

        return Response({"order": orders, "items": items})
    except Exception as e:
        cursor.close()
        print(e)
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
        print(data)
        cursor.execute(
            f"UPDATE ORDENES SET statusEnvio = '{data['status']}' WHERE idOrden={pk}"
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


@api_view(["DELETE"])
def delete(request, pk):
    try:
        cursor.execute(f"DELETE FROM ORDERS WHERE idOrder = {pk}")
        return Response("200")
    except Exception as e:
        print(str(e))
        return Response(str(e))
