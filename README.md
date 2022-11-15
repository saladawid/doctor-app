# App Doctor

### Simple application for patient management.
### Demo: https://appdoctor.project-online.site/

## Features
#### User registration and login
#### Adding, editing, removing a patient.
#### Adding a test to a patient.
#### Send messages to a users

## Used Technologies
#### Node
#### Express
#### MongoDb (Mongoose)
#### React
#### Bootstrap  
#### JWT


### Env Variables
Create a .env file in then root and add the following
```
PORT=3001
DATABASE=your mongodb
CORS_ORIGIN=*
JWT_SECRET=secretKey
NODE_ENV=development
```

### Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```

### Run
```
# Run frontend 
npm run client

# Run backend 
npm run server
```

## Build & Deploy
```
# Create frontend prod build
cd frontend
npm run build
```

## Sample User Logins
```
login: admin@admin.com (Admin)
password: admin

test@test.com (Customer)
12345