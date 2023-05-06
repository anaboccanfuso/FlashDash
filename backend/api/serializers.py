'''
Converts objects into data types understandable by React/JavaScript
'''
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import Set, Question, Answer, Report, Save, OTP, Profile
from rest_framework.validators import UniqueValidator
import string

class UserSerializer(serializers.ModelSerializer):
    '''
    Serializes user objects.
    '''
    # all users must have a unique email
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    # all users must have a valid, strong password that they have replicated (password2)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        '''
        Requires user to have first name
        Returns username (str), email (str), first name (str), and two matching passwords (str)
        '''
        model = User
        fields = ('username', 'email', 'first_name', 'password', 'password2')
        extra_kwargs = {
            'first_name': {'required': True},
        }
        
    def validate(self, attrs):
        '''
        Ensures that both passwords entered match
        If they match, return the user's attributes, otherwise throw validation error
        '''
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields don't match."})
        return attrs
    
    def create(self, validated_data):
        '''
        Creates new user, formats inputs to ensure uniform format
        Returns user created
        '''
        name = validated_data['first_name'].lower() # stores names as all lowercase 
        user =  User.objects.create_user(
            # ensures uniform format, no duplicates that have different capitalization
            username=validated_data['username'].lower(),
            email=validated_data['email'].lower(),
            # capitalizes the first letter of each word in the name
            first_name=string.capwords(name),
            password=validated_data['password']
        )
        Profile.objects.create(user=user)
        return user
        
class AuthSerializer(serializers.Serializer):
    '''
    Serializes authorization for users.
    '''
    username = serializers.CharField()
    password = serializers.CharField(
        style = {'input_type': 'password'},
        trim_whitespace=False
    )
    def validate(self, attrs):
        '''
        Validates username and password match a user in the database.
        '''
        username = attrs.get('username').lower()
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password
        )
        # Username and password do not match a user in the database
        if not user:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')
        attrs['user'] = user
        return

class SetSerializer(serializers.ModelSerializer):
    '''
    Serializes set objects.
    '''
    class Meta:
        '''
        Returns all fields in set model.
        '''
        model = Set
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    '''
    Serializes question objects.
    '''
    class Meta:
        '''
        Returns all fields in question model.
        '''
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    '''
    Serializes answer objects.
    '''
    class Meta:
        '''
        Returns all fields in answer model.
        '''
        model = Answer
        fields = '__all__'
        
class ReportSerializer(serializers.ModelSerializer):
    '''
    Serializes report objects.
    '''
    class Meta:
        '''
        Returns all fields in report model.
        '''
        model = Report
        fields = '__all__'
        
class SaveSerializer(serializers.ModelSerializer):
    '''
    Serializes save objects.
    '''
    class Meta:
        '''
        Returns all fields in save model.
        '''
        model = Save
        fields = '__all__'
        
class SaveSetSerializer(serializers.ModelSerializer):
    '''
    Serializes a save object with certain variables included.
    '''
    set = SetSerializer(many=False)
    class Meta:
        '''
        Returns set in save model.
        '''
        model = Save
        fields = ['set']

class QuestionAnswerSerializer(serializers.ModelSerializer):
    '''
    Serializes a question object with certain variables included. 
    '''
    answers = AnswerSerializer(many=False, read_only=True)
    class Meta:
        '''
        Returns prompt, answers, and image in question model.
        '''
        model = Question
        fields = ['prompt', 'answers', 'image']

class SetQuestionSerializer(serializers.ModelSerializer):
    '''
    Serializes a set object with certain variables included. 
    '''
    questions = QuestionAnswerSerializer(many=True, read_only=True)
    class Meta:
        '''
        Returns title and questions in set model.
        '''
        model = Set
        fields = ['title', 'questions']

class SetTagsQuestionSerializer(serializers.ModelSerializer):
    '''
    Serializes a set object with certain variables included. 
    '''
    questions = QuestionAnswerSerializer(many=True, read_only=True)
    class Meta:
        '''
        Returns title, description, school, subjects, identifier, and questions in set model. 
        '''
        model = Set
        fields = ['title', 'description', 'school', 'subjects', 'identifier','questions']

class OTPSerializer(serializers.ModelSerializer):
    '''
    Serializes OTP objects. 
    '''
    class Meta:
        '''
        Returns all fields in OTP model.
        '''
        model = OTP
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    '''
    Serializes profile objects.
    '''
    class Meta:
        '''
        Returns all fields in profile model.
        '''
        model = Profile
        fields = '__all__'