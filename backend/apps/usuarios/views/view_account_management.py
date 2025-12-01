# backend/apps/usuarios/views/view_account_management.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from ..models import Usuario
from ..serializers import UsuarioSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def self_deactivate_account(request):
    """
    Permite al usuario desactivar su propia cuenta voluntariamente.
    Puede reactivarla posteriormente sin contactar al admin.
    """
    user = request.user
    
    # Verificar que no esté ya suspendido por admin
    if user.admin_suspended:
        return Response({
            'error': 'Tu cuenta está suspendida por un administrador. Contacta con soporte.'
        }, status=status.HTTP_403_FORBIDDEN)
    
    # Desactivar cuenta
    user.self_deactivated = True
    user.is_active = False
    user.save()
    
    return Response({
        'message': 'Tu cuenta ha sido desactivada. Puedes reactivarla en cualquier momento desde la página de login.',
        'self_deactivated': True
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def self_reactivate_account(request):
    """
    Permite al usuario reactivar su cuenta si la desactivó voluntariamente.
    No requiere autenticación ya que el usuario está desactivado.
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({
            'error': 'Email y contraseña son requeridos'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = Usuario.objects.get(email=email)
    except Usuario.DoesNotExist:
        return Response({
            'error': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # Verificar contraseña
    if not user.check_password(password):
        return Response({
            'error': 'Contraseña incorrecta'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Verificar que esté desactivado voluntariamente
    if not user.self_deactivated:
        if user.admin_suspended:
            return Response({
                'error': 'Tu cuenta está suspendida por un administrador. Debes contactar con soporte.',
                'admin_suspended': True,
                'suspension_reason': user.suspension_reason
            }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'error': 'Tu cuenta no está desactivada'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    # Reactivar cuenta
    user.self_deactivated = False
    user.is_active = True
    user.save()
    
    return Response({
        'message': 'Tu cuenta ha sido reactivada exitosamente. Ya puedes iniciar sesión.',
        'reactivated': True
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_suspend_user(request, user_id):
    """
    Permite al administrador suspender una cuenta de usuario.
    El usuario no puede reactivarla por sí mismo.
    """
    reason = request.data.get('reason', 'Sin razón especificada')
    
    try:
        user = Usuario.objects.get(id=user_id)
    except Usuario.DoesNotExist:
        return Response({
            'error': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # No permitir suspender a otros admins
    if user.rol == 'admin':
        return Response({
            'error': 'No puedes suspender a otro administrador'
        }, status=status.HTTP_403_FORBIDDEN)
    
    # Suspender cuenta
    user.admin_suspended = True
    user.is_active = False
    user.suspension_reason = reason
    user.suspension_date = timezone.now()
    user.save()
    
    return Response({
        'message': f'Usuario {user.nombre} ha sido suspendido',
        'user': UsuarioSerializer(user).data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_reactivate_user(request, user_id):
    """
    Permite al administrador reactivar una cuenta suspendida.
    """
    try:
        user = Usuario.objects.get(id=user_id)
    except Usuario.DoesNotExist:
        return Response({
            'error': 'Usuario no encontrado'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # Reactivar cuenta
    user.admin_suspended = False
    user.self_deactivated = False
    user.is_active = True
    user.suspension_reason = None
    user.suspension_date = None
    user.save()
    
    return Response({
        'message': f'Usuario {user.nombre} ha sido reactivado',
        'user': UsuarioSerializer(user).data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_account_status(request):
    """
    Obtiene el estado actual de la cuenta del usuario.
    """
    user = request.user
    
    return Response({
        'is_active': user.is_active,
        'self_deactivated': user.self_deactivated,
        'admin_suspended': user.admin_suspended,
        'suspension_reason': user.suspension_reason if user.admin_suspended else None,
        'suspension_date': user.suspension_date if user.admin_suspended else None,
        'can_self_reactivate': user.self_deactivated and not user.admin_suspended
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_support(request):
    """
    Envía una solicitud de soporte al administrador.
    """
    user = request.user
    message = request.data.get('message', '')
    issue_type = request.data.get('issue_type', 'general')
    
    # TODO: Implementar sistema de tickets o envío de email
    # Por ahora solo registramos la solicitud
    
    return Response({
        'message': 'Tu solicitud ha sido enviada al equipo de soporte. Te contactaremos pronto.',
        'ticket_id': f'TICKET-{user.id}-{timezone.now().timestamp()}',
        'status': 'pending'
    }, status=status.HTTP_200_OK)
