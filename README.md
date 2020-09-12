
# Video requesting application

## The idea behind the project

I noticed that youtubers need more ways to generate revenue from their audience. I decided to create a video requesting site for it. The idea was to create a web app where youtubers could receive custom video requests from their audience. (similiar to [Cameo](https://www.cameo.com) but specifically designed for youtubers) Youtubers can setup their own account and set a price for custom video requests. The app is only used for collecting payments and custom video requests, not for hosting videos.

## How it works

1. Sign in using your google account and give the application access to your google data. 

2. This generates a new account on the database and signs you in.

3. Click on the link to create a stripe payout account. Creating it allows you to receive payouts through stripe.

4. Set a price for custom video requests. This is the amount needed to pay in order to leave a custom video request.

5. This generates an URL address which you can share with your audience.
 
6. Your fans can now write you their custom video requests using this URL.

7. All of these custom video requests will show up on your account page.

8. You can reject any of the video requests which you don't want to fulfill, this action refunds the stripe payment.

9. Accept the video requests which you plan on fulfilling.

10. Accepting a video request processes the payment and money is added to your stripe account.

11. Fulfill the video requests by uploading the custom videos to your youtube channel.


## Project anatomy

The frontend client is split into two seperate pages for two different users : One page for account creation/management and the other for sending video requests to those accounts. I made a list defining the project parts and seperate the functionalities they needed :

- Page for creating/managing the user account. 
    - Handle signin with Google.
    - Fetches account data from the database.
    - Fetches custom video requests from the database.
    - Allows stripe payout account creation.
    - Allows setting custom video prices.
    - Allows rejecting a video request which refunds the stripe payment.
    - Allows accepting a video request which processes the stripe payment.
    

- Page for requesting custom videos
    - Fetches specific account data from the database.
    - Allows fans to make payments to specific accounts with stripe.
    - Allows fans to write a custom video request to a specific account.


- NodeJS server
    - Fetch google user data.
    - Initializes an account on the database.
    - Serve account data from the database.
    - Serve a list of custom video requests from the database.
    - Handle stripe account creation.
    - Processes the stripe payments.
    - Handle refunding the stripe payments.


- Postgres Database
    - Contains account data.
    - A large array of custom video requests.
    - Holds stripe account data for processing payouts to connected accounts.


 ### Tools & Dependencies used: 

- Built with **React** & **Node**

- **Express** For creating the API.

- **Bootstrap** For easy responsive design and cool components.

- **Google-auth-library** Handles google signin and getting google account data.

- **Stripe** For accepting online payments, creating connected accounts and making payouts to those accounts.

- **Knex** Handle database transactions.

- **Heroku** Hosts the node server.

- **GH-pages** Hosts the frontend client.



## How and why the google account data is used

- Sign in requires the user to give the app access to their google account data. 

- This action generates a google token on the frontend client. The token expires after a while and can be used to pull google account data.

- The token is sent to the server where Google API is used to pull some account data from it.

- The pulled data( first name, last name, email, etc. ) is saved on a database. 

- The data is later used when creating a connected Stripe account and usefull when implementing certain security features.


## Links

- [Backend code](https://github.com/Jupemon/Video-Requester-Backend)
- [Frontend code](https://github.com/Jupemon/video-requester)


## Future plans

I plan on adding hashing for the database and cleaning the code