'''
Backend storage settings
Adapted from: https://dev.to/heroku/properly-managing-django-media-static-files-on-heroku-o2l
'''
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class PublicMediaStorage(S3Boto3Storage):
    '''
    Used to store & serve dynamic media files with no access expiration
    '''
    location = settings.PUBLIC_MEDIA_LOCATION
    default_acl = settings.PUBLIC_MEDIA_DEFAULT_ACL
    file_overwrite = False