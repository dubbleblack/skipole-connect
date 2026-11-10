from skipole import SkipoleClient

for product in SkipoleClient().list_products():
    print(f"{product['name']}: {product['status']}")
