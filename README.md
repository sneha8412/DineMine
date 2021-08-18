### Dinemine is a multi-page web-app 

There are two aspects of this app:

1) **Hosting-**  Allows a person with a talent for cooking and a space for hosting guests, to register on the app as a host and sell their unique dining experiences. As the pandemic hit, many restaurants also closed and there might be many people who might want to use their skills and run a small business. This app will allow them to do that.
The host will be able to create a hosting account
Create experiences with multiple image upload
Update and Delete an experience if required 

2) **Customers** - As a user, there have been many times where I have craved for authentic Indian food and I know there are such amazing homechefs who can cook amazing dishes, if only I had access to them. Now with Dinemine one can experience cuisines from all over the globe in one's vicinity. Especially when traveling to an area where there are not many places that offera particular kind of cuisine, you never know there might just be a dinemine host that is hosting a great experience.


<img width="1321" alt="Screen Shot 2021-08-17 at 11 49 28 AM" src="https://user-images.githubusercontent.com/68921168/129783580-404fa333-9f13-43cf-9703-b320993097d6.png">

<img width="1409" alt="Screen Shot 2021-08-17 at 11 50 42 AM" src="https://user-images.githubusercontent.com/68921168/129783760-33ea2e96-3247-4584-8559-0f2008f0c781.png">

### WIREFRAME

<img width="634" alt="Screen Shot 2021-08-17 at 12 44 53 PM" src="https://user-images.githubusercontent.com/68921168/129791241-6f6e6079-94ff-44cb-98f1-b631e4935ea4.png">

### REACT DATA FLOW DIAGRAM

<img width="600" alt="Screen Shot 2021-08-17 at 12 50 07 PM" src="https://user-images.githubusercontent.com/68921168/129791071-3f9e9e6b-ab15-4131-b261-2d5890734fdd.png">



### DEPENDENCIES 
This app uses: 
  1. React js
  2. Javascript Date Utility library
  3. React Material UI
  4. React Bootstrap
  5. Google maps API
  6. Google oAuth 
  
  **Deployment:**
  7. Google Firebase
 
   
### SETUP - This project was bootstrapped with Create React App
In the terminal run command 

1. **SET UP React** 
   ```jsx
   npm install
   
   npx create-react-app my-app
   
   cd my-app
   
   npm start
   ```
2. **SET UP Material UI**

   ```jsx
   npm install @material-ui/core

   npx browserslist@latest --update-db

   npm install @material-ui/icons

   npm install @material-ui/lab

   npm install react-transition-group //renders multiple conditional logic

   npm start
   ```

3. **SET UP Javascript Date Utility** 
   ```jsx
   npm i date-fns
   
   npm audit fix --force
   ```
   
4. **SET UP REACT BOOTSTRAP**
   ```jsx
   
   npm install react-bootstrap@next bootstrap@5.0.2
   
    ```
    
5. **SETUP GOOGLE MAPS**

    https://developers.google.com/maps/documentation/javascript/get-api-key
    ```jsx
    npm i google-maps-react --s
    ```
    
    **Get google map API Key**
    
    https://developers.google.com/maps/documentation/javascript/get-api-key#creating-api-keys
    

6. **SETUP Google oAuth**

   1. Install ngrok for localhost testing only

   [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup)

   [ngrok - secure introspectable tunnels to localhost](https://dashboard.ngrok.com/get-started/setup)

   2. terminal cmd 

   ```jsx
   % cd ngrok
   % ngrok

   ```

   Forwarding address is generated
   
<img width="654" alt="Screen Shot 2021-08-17 at 12 40 24 PM" src="https://user-images.githubusercontent.com/68921168/129789830-2c75fd8b-c986-47cf-b028-c45e3f43f782.png">

   
   3. copy paste the blue code into google credentials page - create credentials (dropdown oAuth) basically add the ngrok forwarding address in the URI and authorized js origins and authorised redirect URI

 <img width="635" alt="Screen Shot 2021-08-17 at 12 39 51 PM" src="https://user-images.githubusercontent.com/68921168/129789790-03b92f70-3973-40b5-9209-0b199985e5ea.png">


   ```jsx
   /ngrok https://ea8ed5584d5b.ngrok.io 
   (this code will change everytime ngrok is opened)
   ```

  4. start the react server

   ```jsx
   npm run start
   ```

**LEARNING**

Safari is not reliable when it comes to testing front end - use google chrome

when using incognito mode you need to enable the cookies in react otherwise the google authentication will give error since google chrome has cookies disabled by default
    
 
7. **SETUP FIREBASE DEPLOYMENT**

    resource: https://www.geeksforgeeks.org/how-to-deploy-react-project-on-firebase/

    Install Firebase CLI

    to host your site with Firebase Hosting, you need the Firebase CLI (a command line tool).

    Run the following npm command to install the CLI or update to the latest  CLI version

    ```python
    npm install -g firebase-too
    ```
    
  <img width="632" alt="Screen Shot 2021-08-17 at 1 06 43 PM" src="https://user-images.githubusercontent.com/68921168/129793165-621774e8-e6e4-41ca-bc83-ede40e3ab76f.png">

  SELECT THE HOSTING OPTION
  
  <img width="637" alt="Screen Shot 2021-08-17 at 1 07 16 PM" src="https://user-images.githubusercontent.com/68921168/129793234-19b7d420-97c1-483e-84eb-441f3110a497.png">

  to the 3 questions - answer is build, yes, no
  
  <img width="634" alt="Screen Shot 2021-08-17 at 1 09 02 PM" src="https://user-images.githubusercontent.com/68921168/129793491-85ed0d60-f295-4d69-a743-fc5e0c3070f8.png">

  ```jsx
  $ npm run build

  $ firebase deploy

  ```

  <img width="643" alt="Screen Shot 2021-08-17 at 1 11 16 PM" src="https://user-images.githubusercontent.com/68921168/129793705-b6d4a0aa-8ef2-4d15-be08-0eead06d92c1.png">



