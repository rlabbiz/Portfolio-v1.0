from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Posts
from .serializers import PostsSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes

current_user = {}

@api_view(['GET', 'POST'])
def PostsView(request):
    if request.method == 'GET':
        queryset = Posts.objects.all()
        serializer_class = PostsSerializer(queryset, many=True)
        return Response({"Posts": serializer_class.data})
    elif request.method == 'POST':
        serializer = PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def PostDetails(request, id):
    try:
        post = Posts.objects.get(pk=id)
    except Posts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET': 
        serializer = PostsSerializer(post)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PostsSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def SingUp(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({"Token": token.key, "User": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else :
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def LogIn(request):
    if IsAuthenticated:
        return Response("You are already logged in", status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        try:
            user = User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        if user.check_password(request.data['password']):
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            return Response({"Token": token.key, "User": UserSerializer(user).data})
        else:
            return Response("invalid password", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

        
    
