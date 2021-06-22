import os, sys


def userSerializer(queries, many):
    try:
        if many == False:
            users = {
                "id": queries[0],
                "name": queries[1],
                "lastName": queries[2],
                "email": queries[3],
                "password": queries[4],
                "isAdmin": True if queries[5] == 1 else False,
            }

        else:
            users = []
            for user in queries:
                users.append(
                    {
                        "id": user[0],
                        "name": user[1],
                        "lastName": user[2],
                        "email": user[3],
                        # "password": user[4],
                        "isAdmin": True if user[5] == 1 else False,
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return users


def productSerializer(queries, many):
    try:
        if many == False:
            products = {
                "id": queries[0],
                "categorie": queries[1],
                "name": queries[2],
                "description": queries[3],
                "price": queries[4],
                "countInStock": queries[5],
                "img": queries[6],
                "nameCategorie": queries[7],
            }
        else:
            products = []
            for product in queries:
                products.append(
                    {
                        "id": product[0],
                        "categorie": product[1],
                        "name": product[2],
                        "description": product[3],
                        "price": product[4],
                        "countInStock": product[5],
                        "img": product[6],
                        "nameCategorie": product[7],
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return products


def categorieSerializer(queries, many):
    try:
        if many == False:
            categories = {
                "id": queries[0],
                "name": queries[1],
                "description": queries[2],
            }
        else:
            categories = []
            for categorie in queries:
                categories.append(
                    {
                        "id": categorie[0],
                        "name": categorie[1],
                        "description": categorie[2],
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return categories


def orderSerializer(queries, many):
    try:
        if many == False:
            orders={}
            orders = {
                "id": queries[0],
                "idUser": queries[1],
                "country": queries[2],
                "city": queries[3],
                "street": queries[4],
                "zip": queries[5],
                "statusDeliver": queries[6],
                "statusPay": queries[7],
            }
        else:
            orders = []
            for order in queries:
                orders.append(
                    {
                        "id": order[0],
                        "idUser": order[1],
                        "country": order[2],
                        "city": order[3],
                        "street": order[4],
                        "zip": order[5],
                        "statusDeliver": order[6],
                        "statusPay": order[7],
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return orders


def orderArticleSerializer(queries, many):
    try:
        if many == False:
            items = {
                "idProduct": queries[0],
                "idOrder": queries[1],
                "qty": queries[2],
                "subtotal": queries[3],
                "tax": queries[4],
                "total": queries[5],
                "product": queries[6],
                "price": queries[7],
                "img": queries[8],
            }
        else:
            items = []
            for item in queries:
                items.append(
                    {
                        "idProduct": item[0],
                        "idOrder": item[1],
                        "qty": item[2],
                        "subtotal": item[3],
                        "tax": item[4],
                        "total": item[5],
                        "product": item[6],
                        "price": item[7],
                        "img": item[8],
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return items
