"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta
import sys
import warnings
from decouple import config

warnings.filterwarnings("ignore", message="No directory at", module="whitenoise.base" )
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('DJANGO_SECRET_KEY') 

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DJANGO_DEBUG', cast=bool) #make environment variable

ALLOWED_HOSTS = [
    'backend.flashdash.app',
    'https://flashdash-appstone.herokuapp.com', #may remove later!
    'flashdash-appstone.herokuapp.com',
    'appstone-flashdash.herokuapp.com',
    # '127.0.01.',
    '127.0.0.1',
    'localhost',
    ]


# Application definition

INSTALLED_APPS = [
    'admin_notification',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'storages',
    'api.apps.ApiConfig',
    'rest_framework',
    'knox',
    'corsheaders',
    'drf_yasg',
]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql_psycopg2',
#        'NAME': 'FlashDash',
#        'USER': 'postgres',
#        'PASSWORD': 'Appstone@dmin',
#        'HOST': 'localhost',
#        'PORT': '5432',
#    }
#}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'dc8f6vcrlo6m1n',
#         'USER': 'eaaadrqmmxvrto',
#         'PASSWORD': '3aae20fd807a526b2782a5a164c4198200433709e3e47d46151bb64a4683e454',
#         'HOST': 'ec2-3-216-167-65.compute-1.amazonaws.com',
#         'PORT': '5432',
#     }
# }
if 'test' in sys.argv:
    DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': 'testDB',
                'USER': 'postgres',
                'PASSWORD': config('TEST_DATABASE_PASSWORD'), 
                'HOST': 'localhost',
                'PORT': '5432',
        }
    }
else:
    DATABASES = { 
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': config('PRODUCTION_DATABASE_NAME'),
            'USER': config('PRODUCTION_DATABASE_USER'),
            'PASSWORD': config('PRODUCTION_DATABASE_PASSWORD'),
            'HOST': config('PRODUCTION_DATABASE_HOST'),
            'PORT': config('PRODUCTION_DATABASE_PORT'),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_FILES_DIR = (
    os.path.join(BASE_DIR, 'static')
)

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS=True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000*",
    "http://localhost:8000*",
    "http://127.0.0.1:3000*",
    "http://127.0.0.1:8000*",
    "https://sccapstone.github.io*",
    "https://flashdash-appstone.herokuapp.com*",
    "https://backend.flashdash.app*",
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    "http://localhost:3000*",
    "http://localhost:8000*",
    "http://127.0.0.1:3000*",
    "http://127.0.0.1:8000*",
    "https://sccapstone.github.io*",
    "https://flashdash-appstone.herokuapp.com*",
    "https://backend.flashdash.app*",
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    "http://localhost:3000*",
    "http://127.0.0.1:3000*",
    "https://sccapstone.github.io*",
    "https://flashdash-appstone.herokuapp.com*",
    "https://backend.flashdash.app*",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'knox.auth.TokenAuthentication',
    ]
}

REST_KNOX = {
    'TOKEN_TTL': timedelta(hours=12) #time login tokens are valid for
}

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'api_key': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization'
        }
    },
}

NOTIFICATION_MODEL = 'api.Report' # Select the model you want to control, for example: "accounts.Message"

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' #got settings from: https://www.geeksforgeeks.org/setup-sending-email-in-django-project/
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 465
EMAIL_HOST_USER = config('EMAIL_HOST_USER') 
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD') 

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

RECENTLY_VIEWED_COUNT = 5
#Values from config
AWS_STORAGE_BUCKET_NAME = config('BUCKETEER_BUCKET_NAME')
AWS_ACCESS_KEY_ID = config('BUCKETEER_AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('BUCKETEER_AWS_SECRET_ACCESS_KEY')
AWS_S3_REGION_NAME = config('BUCKETEER_AWS_REGION')
AWS_S3_ENDPOINT_URL = config('BUCKETEER_ENDPOINT_URL')
AWS_DEFAULT_ACL = None
AWS_S3_SIGNATURE_VERSION = config('BUCKETEER_S3_SIGNATURE_VERSION')

PUBLIC_MEDIA_DEFAULT_ACL = 'public-read'
PUBLIC_MEDIA_LOCATION = 'media/public'
MEDIA_URL = f'{AWS_S3_ENDPOINT_URL}/{PUBLIC_MEDIA_LOCATION}/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
