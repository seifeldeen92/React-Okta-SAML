# Simple React and Express app SAML login by Okta 

This is a very simple integration to demonstrate SSO via SAML [Okta](https://www.okta.com/)

## Features

- Save user if authenticated
- Redirect user to Okta login if user not authenticated to access our app

## Tech

This project uses:

- [React] - For the client side 
- [node.js] - Evented I/O for the backend
- [Express] - node.js framework
- [Passport] - Authentication middleware for our API 
- [Passport SAML] - This is a SAML 2.0 authentication provider for Passport 

## Installation

App requires [Node.js](https://nodejs.org/) v10+ to run.

#### Install Server
Install the dependencies and devDependencies and start the server on port `5000`.

```sh
cd server
yarn install
yarn dev
```
in another terminal window
```sh
cd server
yarn watch
```

#### Install Client
Install the dependencies and devDependencies and start the client on port `3000`.

```sh
cd client
yarn install
yarn start
```

## Setup Okta App
Go to [Okta developer](https://developer.okta.com/) and signup or signin. After you signin, you need to create an application from the left sidebar. 

#### How to Configure SAML 2.0 for your Application
```
Single sign on URL: http://localhost:5000/login/callback
Audience URI (SP Entity ID): http://localhost:5000
Name ID format: EmailAddress
Application username: Okta username
```
After you finish this step, you will need to copy `Identity Provider Single Sign-On URL` and `X.509 Certificate` found after you click on **View Setup Instructions**.Afterwards, add your copied `Identity Provider Single Sign-On URL` to the `entryPoint` property in `config.ts` under `saml` property, then add your application's `X.509 Certificate` in `saml.pem`.

## Reference 
- [Okta developer docs](https://developer.okta.com/docs/)
- [React SAML Authentication](https://www.youtube.com/watch?v=xUL59SKiwmE) by [@joeythelantern](https://github.com/joeythelantern) 🙏 Thank You

**Congratulation! you are done! 🥳**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [React]: <https://reactjs.org/>
   [passport]: <http://www.passportjs.org/>
   [passport saml]: <https://github.com/node-saml/passport-saml>


