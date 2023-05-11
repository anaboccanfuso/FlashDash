# Appstone: FlashDash WebApp
_**Application is not currently deployed**_

The FlashDash application is an online study application where users can create, search, and study from sets of terms. User can view sets other users created, edit their own sets, and test with all sets using flashcards or a quiz mode. 

### Instructions to Install and Run Web Application
Clone Appstone repository to personal computer by running this in your terminal: `git clone https://github.com/SCCapstone/Appstone.git`  
Change into the /Appstone/backend directory and start a virtual environment by running: `pipenv shell`   
Run backend server: `python manage.py runserver`

In another terminal, change into the /Appstone/frontend directory and run `npm start`. This will automatically launch the website in your broswer.   
   
Keep both terminals running while using/editing the web application.

## External Requirements
This program requires Python, Django, and Node.js to be installed on your local machine.

Install python following the instructions for your respective OS from this link: https://www.python.org/downloads/  

For **Windows** complete the following commands in Command Prompt.  
For **MacOS** complete the following commands in Terminal.  
For **Linux/UNIX**  complete the following commands in your command line.  

Before starting double-check python is installed by running: `python -V`

1. Download pipenv (python virtual environment) by running this command: `pip install --user pipenv` 
2. Download Django: `pip install Django`  
    * djangorest framework: `pip install djangorestframework`
    * djangocorsheaders: `python -m pip install django-cors-headers`
3. Download Node.js here: https://nodejs.org/en/download/

## Setup

Run the following commands once to esnure proper setup of the environment:
1. Clone the repository `git clone https://github.com/SCCapstone/Appstone.git`
2. Navigate to the `frontend` directory and run `npm install` to install of the frontend dependencies
3. Navigate outside of the Appstone directory and setup the virtual environment
4. Install Django using `pip install Django`

*Important Note*: Although the given commands only need to be run once, if the repository is deleted from your local computer, these commands will need to be run again. Also Step 2, will need to be run everytime a new React dependecy is installed. Therefore although it is needed for the setup, it is recommended that `npm install` is run after every pull.

## Running

First step is to change your current working directory into the Appstone cloned repository. One there:   
To start up the backend, from your terminal, run:   
```cd backend```    
followed by:   
```python manage.py runserver```   
After the backend is running, the frontend should be started.   
**Note:** The backend should be running before starting the frontend
or else the frontend might have errors when trying to fetch information from the backend.   
To start the frontend, run:   
```cd ../frontend```   
```npm start```  
This will start the frontend, and now the app is running!

# Deployment

To deploy the Django backend, use Heroku:
1. set up a virtual environment
2. create a Heroku repository in the virtual environment
3. add a procfile and text document
4. push repository to the Heroku master branch
5. switch the database from SQLite3 to PostgreSQL by remotely hosting the database on a server (like AWS EC2)
6. install the middleware WhiteNoise and add to settings.py file
7. configure static routes in settings.py file
8. commit and push to Heroku master branch

To deploy the React Frontend, using Netlify:
1. sign up for Netlify account
2. navigate to frontend directory
3. install netlify-cli tool
```npm install -g netlify-cli```
3. authorize netlify by keying into command line
```netlify login```
4. after this command, your browser will open; click authorize
5. create production build
```npm run build```
6. deploy to netlify
```netlify deploy --prod```  
   select "Create & configure a new site"  
   select your team  
   name your app (optional)  
7. when prompted to enter publish directory, type in "build". hit enter

# Testing

Unit and behvioral testing has been implemented to ensure proper functionality of the web application. Details about testing technologies and directions on how to run the tests can be seen below.

## Testing Technology

### Selenium:
Selenium is used in this project to test behvioral components of the web applications. In order to be able to run the Selenium tests, install [Selenium IDE Chrome Extention](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en)


## Running Unit Tests
To run backend unit tests:
1. On your local machine, navigate to the backend directory from root ```cd backend```
2. Run ```python manage.py test```  
*After the test runs, it will output how many passed and failed.*

## Running Behavior Tests

### Selenium:
To run Selenium tests:
1. Ensure that [Selenium IDE Chrome Extention](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en) is installed
2. Click on the extension
3. Open the desired test file: all files can be found in the **selenium_behavior_tests** directory
4. Click run test button   
*If test fails, IDE will signal failure to user*

# Style Guides
Python: https://google.github.io/styleguide/pyguide.html  
HTML/CSS: https://google.github.io/styleguide/htmlcssguide.html  
JavaScript: https://google.github.io/styleguide/jsguide.html  

# Authors

Ana Boccanfuso: boccanfa@email.sc.edu  
Allie Scott: abs25@email.sc.edu   
Lareb Khan: lskhan@email.sc.edu 
David Duggan: dwduggan@email.sc.edu
