from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('diagram', views.diagram),
    path('diagram/<str:algo>', views.diagram),
    path('diagram/<str:algo>/<int:time_slice>', views.diagram),
    path('add', views.add_process),
    path('clear', views.clear),
    path('random', views.random),
    path('comp', views.comp),
]
