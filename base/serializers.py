def userSerializer(queries):
    users = []
    for user in queries:
        users.append(
            {
                "id": user[0],
                "name": user[1],
                "lastName": user[2],
                "email": user[3],
                "password": user[4],
                "isAdmin":user[5]
            }
        )
    return users        
def productSerializer(queries):
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