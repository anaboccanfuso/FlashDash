'''
Used to display models in the Django admin panel
'''
from django.contrib import admin
from .models import Set, Question, Answer, Report, Save, Image, Profile

# establishes models in admin site
admin.site.register(Set)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Report)
admin.site.register(Save)
admin.site.register(Image)
admin.site.register(Profile)
