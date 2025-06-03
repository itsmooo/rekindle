from django.contrib import admin
from django.urls import path, include
from api.views import PredictBurnoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', PredictBurnoutView.as_view(), name='predict'),
] 