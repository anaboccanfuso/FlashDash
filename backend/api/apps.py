'''
Includes the application configuration
'''
from django.apps import AppConfig

class ApiConfig(AppConfig):
    '''
    configures api
    '''
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
