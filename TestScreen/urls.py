from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('diagram', views.diagram),
    path('diagram/<str:algo>', views.diagram),
    path('add', views.addProcess),
    path('sess', views.sess)
]
