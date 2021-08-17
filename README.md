###Dinemine 
   is a multi-page web-app 

There are two aspects of this app -

1) **Hosting-**  Allows a person with a talent for cooking and a space for hosting guests, to register on the app as a host and sell their unique dining experiences. As the pandemic hit, many restaurants also closed and there might be many people who might want to use their skills and run a small business. This app will allow them to do that.
The host will be able to create a hosting account
Create experiences with multiple image upload
Update and Delete an experience if required 

2) **Customers** - As a user, there have been many times where I have craved for authentic Indian food and I know there are such amazing homechefs who can cook amazing dishes, if only I had access to them. Now with Dinemine one can experience cuisines from all over the globe in one's vicinity. Especially when traveling to an area where there are not many places that offera particular kind of cuisine, you never know there might just be a dinemine host that is hosting a great experience.


<img width="1321" alt="Screen Shot 2021-08-17 at 11 49 28 AM" src="https://user-images.githubusercontent.com/68921168/129783580-404fa333-9f13-43cf-9703-b320993097d6.png">

<img width="1409" alt="Screen Shot 2021-08-17 at 11 50 42 AM" src="https://user-images.githubusercontent.com/68921168/129783760-33ea2e96-3247-4584-8559-0f2008f0c781.png">

### DEPENDENCIES 
This app depends on 
  1. React
  2. Javascript Date Utility library
  3. React Material UI
  4. React Bootstrap
  5. Google simple maps API
  6. Google oAuth 
  
  **Deployment:**
  7. Google Firebase
 
   
### SETUP
In the terminal run command 
1. SET UP React 
   
   npm install

2. SET UP Material UI 

   npm install @material-ui/core

   npx browserslist@latest --update-db

   npm install @material-ui/icons

   npm install @material-ui/lab

   npm install react-transition-group //renders multiple conditional logic

   npm start

3. SET UP Date 

   npm i date-fns
   
   npm audit fix --force
   
4. SET UP REACT BOOTSTRAP
   
   npm install react-bootstrap@next bootstrap@5.0.2
   
   in the app import: 
   
5. SETUP Google oAuth
   
   GOOGLE oAUTH

   STEPS

   1. Install ngrok 

   [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup)

   [ngrok - secure introspectable tunnels to localhost](https://dashboard.ngrok.com/get-started/setup)

   1. terminal cmd 

   ```jsx
   % cd ngrok
   % ngrok

   ```

   Forwarding address is generated

   https://www.notion.so/Google-oAuth-tutorial-47d0aa5213f0433cb21659f7dbb3763d#fd8239732aa54b43be3957e92c433d55

   1. copy paste the blue code into google credentials page - create credentials (dropdown oAuth) basically add the ngrok forwarding address in the URI and authorized js origins and authorised redirect URI

   https://www.notion.so/Google-oAuth-tutorial-47d0aa5213f0433cb21659f7dbb3763d#36615d67fa09448c9f9d7232ed21df08
   
   1. copy paste

     /ngrok https..... (light blue highlighted code) to

   ```jsx
   /ngrok https://ea8ed5584d5b.ngrok.io 
   (this code will change everytime ngrok is opened)
   ```

   1. start the react server

   ```jsx
   npm run start
   ```

**LEARNING**

Safari is not reliable when it comes to testing front end - use google chrome

when using incognito mode you need to enable the cookies in react otherwise the google authentication will give error since google chrome has cookies disabled by default
   
