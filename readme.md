# EXPRESS API

A REST api boilerplate project, using expressjs, mongodb, passport and jsongwebtoken.
Check the [demo](https://start-express-api.herokuapp.com/).

## Purpose

The goal for this project is to provide website developers with one ready to use expressjs API with social login.
If you are planning to make an API without wasting time making authentication process, this is where you should start.

## Architecture

Social login
![Social login authentication workflow](https://start-express-api.herokuapp.com/assets/img/social-auth-workflow-min.png)

Local login
![Local login authentication workflow](https://start-express-api.herokuapp.com/assets/img/local-auth-workflow-min.png)

## Configuration

### Config

* Start by creating a [facebook](http://developers.facebook.com) and/or [google](https://console.developers.google.com/) application.
* Then get the ``clientID`` AND ``clientSecret``
* Create a new config file ``config/env.js`` based on the ``config/env.example.js`` and put the clientID and clientSecret that you get from third party websites.
* Change the ``mongodbUrl`` to reflect your running mongo server address, if you don't own a mongodb server try creating [mlab starting server](https://mlab.com/)

### Install and run the server

```node
npm install
npm start
```

## How to use the api

### Authentications endpoints

| Method  | Endpoint | Description  |
| ------- | -------- | ------------ |
| GET  | ``/api/auth/{provider}``  | Where {provider} should be replace by "facebook" or "google".<br> Once the user has logged in and authorized the app through {provider} website, server should return a `200 OK` status code response with the token. <br>Ex: <br> ``{ "auth": true, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }``<br> [How to use this token from client code?](#how-to-use-the-token) |
| POST  | ``/api/auth/register``  | Register a new user with some given info. <br>Request body should contain the following fields: <br> * **name**<br>* **email**<br>* **password** |
| POST | ``/api/auth/login`` | Login an existing user.<br> Request body should contain the following fields:<br> * **email** <br>* **password** |

### Users endpoints

| Method  | Endpoint | Description  |
| ------- | -------- | ------------ |
| GET | ``/api/users`` | Get a list of all users in response. Ex: <br> ``[{ "_id": "5ada09f7da2d163528cee5c2", "name": "test", "email": "test@email.com", "providerType": "local", "profile": { "username": "" } },{ "profile": { "id": "117024279514409934901", "displayName": "Test name", "avatarUrl": "https://photo.google.com/photo.jpg?sz=50" }, "_id": "5ada0a79da2d163528cee5c3", "name": "Test name", "email": "test@gmail.com", "providerType": "google" }]`` |
| GET | ``/api/users/{id}`` | Get a single user with the given {id} |
| GET | ``/api/users/me`` | Get user info based on the provided token. <br> One example output: <br> ``{ "_id": "5ada09f7da2d163528cee5c2", "name": "Sofiene Meksi", "email": "local@gmail.com", "providerType": "local" }`` |
| PUT | ``/api/users/{id}`` | Update a user with the given {id}. Body request should contain fields that will be changed, otherwise not mentioned fields will remain intact. Ex:<br> * **name: "test"** <br> * **email: "test@email.com"** <br>One possible response should be like: ``{ "_id": "5ada09f7da2d163528cee5c2", "name": "Test name", "email": "local@email.com", "providerType": "local" }``  |
| DELETE | ``/api/users/{id}`` | Delete user with {id}.<br> A ``200 OK`` response status should be returned with a body of: **"User test was deleted."** |


### How to use the token
After a successful login/Register process you will get a json object containing the token.
Client code should add an ``Authorization`` header for each API call.
> Please note to add **"JWT "** before the token string.

EX:
Let say you receive a token of "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
A request header will look like that:
``Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"``