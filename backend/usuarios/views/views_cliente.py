from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def tienda_cliente(request):
    return Response({"cliente": "tienda funcionando"})
