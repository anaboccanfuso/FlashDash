'''
Defines models used by our app in the database
'''
from django.db import models
from django.contrib.auth.models import User
from api.colleges import college as schools
from django.contrib.postgres.fields import ArrayField

def get_default_subjects():
    '''
    Returns empty list for default subjects
    '''
    return list()

class Set(models.Model):
    '''
    Defines set model linked to a user, containing a title, description, time created,
    time updated, school, subjects, identifier, and set length
    '''
    author = models.ForeignKey(User, on_delete=models.CASCADE) # if user is deleted, delete set
    title = models.TextField()
    description = models.TextField(default='', blank=True) # optional field
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    school = models.CharField(max_length=50,choices=schools,default='', blank=True) # optional field
    subjects = ArrayField(models.CharField(max_length=30),default=get_default_subjects, blank=True) # optional field
    identifier = models.TextField(default='', blank=True) # optional field
    setLength = models.IntegerField(default=0, blank=False)
    
    def __str__(self):
        '''
        Returns set title (string)
        '''
        return self.title

class Image(models.Model):
    '''
    Defines image model that contains the text of the image source
    '''
    image = models.TextField()

class Question(models.Model):
    '''
    Defines the question model that contains a reference to the set it belongs to, the 
    content of the question, and an image if it contains one
    '''
    set = models.ForeignKey(Set, related_name='questions', on_delete=models.CASCADE) # if set is deleted, delete question
    prompt = models.TextField()
    image = models.ForeignKey(Image, blank=True, null=True, on_delete=models.CASCADE) # optional field
    
    def __str__(self):
        '''
        Returns content of question (string)
        '''
        return self.prompt

class Answer(models.Model):
    '''
    Defines the answer model that contains a reference to the question it belongs to,
    the content of the answer, and an image if it contains one
    '''
    question = models.OneToOneField(Question, related_name='answers', on_delete=models.CASCADE) # if question is deleted, delete answer
    answer = models.TextField()
    image = models.ForeignKey(Image, blank=True, null=True, on_delete=models.CASCADE) # optional field
    
    def __str__(self):
        '''
        Returns content of answer (string)
        '''
        return self.answer

class Report(models.Model):
    '''
    Defines the report model that references the set that is being reported, 
    the reason (from a list of choices), a reference to the author if the user is 
    logged in
    '''
    set = models.ForeignKey(Set, related_name="reports", on_delete=models.CASCADE) # if set is deleted, delete report
    # list of reasons one can choose to report a set
    REASONS = (
        ('I','INACCURATE INFORMATION'),
        ('A','INAPPROPRIATE'),
        ('C','CHEAT'),
        ('P','VIOLATES IP'),
    )
    reason = models.CharField(max_length=1, choices=REASONS)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True) # if user is deleted, delete report
    
    def __str__(self):
        '''
        Returns reason for the report (string)
        '''
        return self.reason
    
    class Meta:
        '''
        Restricts user from reporting the same set multiple times
        '''
        constraints = [
            models.UniqueConstraint(
                fields=['set','author'], name='unique_set_author_combination'
            )
        ]

class Save(models.Model):
    '''
    Defines the save model that references the user that is saving and the set 
    that is being saved
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE) # if user is deleted, delete save
    set = models.ForeignKey(Set, on_delete=models.CASCADE) # if set is deleted, delete save
    
    def __str__(self):
        '''
        Returns the set title that is being saved (str)
        '''
        return self.set.title

    class Meta:
        '''
        Restricts user from saving the same set multiple times
        '''
        constraints = [
            models.UniqueConstraint(
                fields=['user','set'], name='unique_user_set_combination'
            )
        ]

class OTP(models.Model):
    '''
    Defines the OTP model that references the user that has requested a 
    password change. includes the date/time it was created, and when it expires,
    as well as the one-time password
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE) # if user is deleted, delete OTP
    created = models.DateTimeField(auto_now_add=True)
    expiry = models.DateTimeField()
    otp = models.TextField()

def getDefaultRecently():
    '''
    Defines the default recently viewed, which is an empty list
    '''
    return {'recently_viewed': []}

class Profile(models.Model):
    '''
    Defines the profile model that references the user that it relates to,
    the school of the user, whether the user has dark mode on or off, 
    their most recently viewed sets, and their quiz performance
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE) # if user is deleted, delete profile
    school = models.CharField(max_length=50, default='', blank=True) # optional field
    lightMode = models.BooleanField(default=True)
    recently_viewed = models.JSONField(default=getDefaultRecently, blank=True) # 10 most recently viewed sets, starts out blank
    quiz_performance = models.JSONField(default=dict, blank=True) # dictionary of quiz performances, starts out empty

    
