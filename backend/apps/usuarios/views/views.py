from rest_framework.decorators import api_view
from rest_framework.response import Response

# ------------------------------------------------------------
#   API ROOT
# ------------------------------------------------------------
@api_view(["GET"])
def api_root(request):
    return Response({"message": "API funcionando"})
