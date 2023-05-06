'''
This module is used to execute common tasks used in the views.py class
'''
from .models import Set, Question, Answer, OTP, User, Image, Profile
from .serializers import SetSerializer, UserSerializer
from .models import Set, Question, Answer, OTP, User, Image
from .serializers import SetSerializer, UserSerializer, SetTagsQuestionSerializer
import datetime
from random import randint
import base64
import os
from django.conf import settings
from django.core.files import File
from .media_storage import PublicMediaStorage
from django.core.files.storage import default_storage
import boto3

def getQuestions(setId):
    '''
    Returns the questions of a set, given its set ID
    '''
    questions = Question.objects.filter(set=setId)
    return questions

def deleteQuestion(questionId):
    '''
    Deletes a question, given its ID
    '''
    try:
        question = Question.objects.get(id=questionId) # get question from its id
        associated_answers = Answer.objects.filter(question=question) # get associated answers
        # delete each answer and question
        for answer in associated_answers:
            deleteAnswer(answer)
        question.delete()
        return "Successfully deleted question & all associated answers"
    except:
        # question/answer is not found
        return "Deletion of question was unsuccessful"

def deleteAnswer(answerId):
    '''
    Deletes an answer, given its ID
    '''
    try:
        answer = Answer.objects.get(id=answerId) # get answer from its ID
        answer.delete() # delete answer
        return "Successfully deleted answer"
    except:
        return "Deletion of answer was not successful"

def generateOTP(in_time, user_email):
    '''
    Generates a one-time password, given time and user email
    '''
    user = User.objects.get(email=user_email) # gets user from email
    exp_time = in_time + datetime.timedelta(minutes=60) # calculates expiration time

    # generates random OTP
    generated_pass = ""
    for _ in range(6):
        generated_pass += str(randint(0, 9))
    # create OTP object
    otp = OTP.objects.create(
        user = user,
        created = in_time,
        expiry = exp_time,
        otp = generated_pass
    )
    return otp

def encodeImageQA(serializer):
    '''
    Encodes all images for questions and answers of set into base64, so they can be returned via
    HTTP response
    '''
    for question in serializer.data['questions']:
        if question['image'] != None:
            question['image'] = encode(question['image'])
        image_id = question['answers']['image']
        if image_id != None:
            question['answers']['image'] = encode(image_id=image_id)
    return serializer

def encode(image_id):
    '''
    Encodes images to base64
    '''
    try:
        filename = Image.objects.get(id=image_id).image
        image_data = s3_read(filename=filename)
        image_data = base64.b64encode(image_data)
        return image_data
    except:
        pass

def decode(b64_image, filename="newestNew.png"):
    '''
    Decodes image from base64
    '''
    if len(b64_image.split(',')) > 1:
        b64_image = (b64_image.split(','))[1]
    try:
        media_storage = PublicMediaStorage()
        b64_image = base64.b64decode(b64_image)
        new_image = Image.objects.create()
        with open(f"{filename}", 'wb') as f:
            f.write(b64_image)
            f.close()
        s3_upload(f"{filename}", filename)
        with open(f"{filename}", 'rb') as f:
            new_image.image = filename
            new_image.save()
        os.remove(filename) # remove temporary created image copy
        return new_image
    except Exception as e:
        print("Error", e)
        
def createProfile(user, school=None):
    '''
    Creates a profile for a user
    '''
    try:
        profile = Profile.objects.create(user=user, school=school)
    except Exception as e:
        print(e)

def updateRecentlyViewed(profile, set):
    '''
    Update the list of recently viewed sets
    Recently_viewed: List of n most recently viewed set IDs
    '''
    recently_viewed = profile.recently_viewed
    # if set is not already in recently viewed, add it
    if set.id not in recently_viewed['recently_viewed']:
        if len(recently_viewed['recently_viewed']) < settings.RECENTLY_VIEWED_COUNT:
            recently_viewed['recently_viewed'].append(set.id)
        else:
            recently_viewed['recently_viewed'].insert(0, set.id)
            recently_viewed['recently_viewed'].pop(len(recently_viewed['recently_viewed'])-1)
        profile.recently_viewed = recently_viewed
        profile.save()

def giveAllUsersProfile():
    '''
    Gives all users a profile, creates a new one if one does not exist yet
    '''
    for user in User.objects.all():
        try:
            Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            Profile.objects.create(user=user)

def s3_upload(filename, database_filename):
    '''
    Uploads image to AWS
    '''
    s3_client = boto3.client('s3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name= settings.AWS_S3_REGION_NAME
    )
    database_filename = os.path.join('public/', database_filename)
    try:
        response = s3_client.upload_file(filename, settings.AWS_STORAGE_BUCKET_NAME, database_filename)
    except Exception as e:
        print(e)

def list_s3_files():
    '''
    Lists images from AWS
    '''
    s3_client = boto3.client('s3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name= settings.AWS_S3_REGION_NAME
    )

    response = s3_client.list_objects_v2(
    Bucket=settings.AWS_STORAGE_BUCKET_NAME,
    Prefix='public/')

    for content in response.get('Contents', []):
        print(content['Key'])

def s3_read(filename, file_type='public/'):
    '''
    Reads images from AWS
    '''
    s3_client = boto3.client('s3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name= settings.AWS_S3_REGION_NAME)
    s3_filename = os.path.join(file_type, filename)
    try:
        response = s3_client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_filename)
        return response['Body'].read()
    except Exception as e:
        print(e)

def s3_delete(filename, file_type='public/'):
    '''
    Deletes images from AWS
    '''
    s3_client = boto3.client('s3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name= settings.AWS_S3_REGION_NAME)
    s3_filename = os.path.join(file_type, filename)
    try:
        response = s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_filename)
    except Exception as e:
        print(e)
    
def deleteSetImages(set):
    '''
    Deletes images from a set
    '''
    serializer = SetTagsQuestionSerializer(set)
    set_info = dict(serializer.data) # formats serializer data
    for qa_pair in set_info['questions']:
        if qa_pair['image'] != None:
            q_image = Image.objects.get(id=qa_pair['image'])
            s3_delete(filename=q_image.image)
        if qa_pair['answers']['image'] != None:
            a_image = Image.objects.get(id=qa_pair['answers']['image'])
            s3_delete(filename=a_image.image)

def addQuizEntry(profile, setid, score):
    '''
    Adds a score to the dictionary keeping track of quiz performances
    '''
    score_dict = profile.quiz_performance
    
    if setid in score_dict:
        score_dict[setid].append(score)
    else:
        score_dict[setid] = [score]
    
    profile.save()

def usernameAlreadyExists(username):
    '''
    Checks if a username already exists by attempting to get the user object
    '''    
    try:
        User.objects.get(username=username)
        return True
    except User.DoesNotExist:
        return False
    
def updateSetLength(set):
    '''
    Updates set length of a set given as a parameter
    '''
    questions = Question.objects.filter(set=set)
    length = len(questions)
    return length

def createSetLength():
    '''
    Creates set length for each set
    '''
    sets = Set.objects.all() # all existing set objects in DB
    for set_obj in sets:
        if(set_obj.setLength == 0):
            set_obj.setLength = len(Question.objects.filter(set=set_obj))
            set_obj.save()
