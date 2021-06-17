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
                        "password": user[4],
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
                "existing": queries[5],
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
                        "existing": product[5],
                    }
                )
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

    return products


def categorieSerializer(queries):
    categories = []
    for categorie in queries:
        categories.append(
            {
                "id": categorie[0],
                "name": categorie[1],
                "description": categorie[2],
            }
        )
    return categories


def orderSerializer(queries):
    orders = []
    for order in queries:
        orders.append(
            {
                "id": order[0],
                "idUser": order[1],
                "suburb": order[2],
                "city": order[3],
                "street": order[4],
                "zipcode": order[5],
                "shippingStatus": order[6],
                "paymentStatus": order[7],
            }
        )
    return orders


def orderArticleSerializer(queries):
    orderArticles = []
    for orderArticle in queries:
        orderArticles.append(
            {
                "idProduct": orderArticle[0],
                "idOrder": orderArticle[1],
                "quantity": orderArticle[2],
                "subtotal": orderArticle[3],
                "tax": orderArticle[4],
                "total": orderArticle[5],
            }
        )
    return orderArticles
