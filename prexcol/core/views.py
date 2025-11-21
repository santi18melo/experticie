from rest_framework.decorators import api_view
from rest_framework.response import Response
import socket

@api_view(["GET"])
def server_info(request):
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)

    return Response({
        "server_host": local_ip,
        "server_port": 8000
    })
