

# Video requesting application

## The idea behind the project

I noticed that youtubers need more ways to generate revenue from their audience. I decided to create a video requesting site for it. The idea was to create a web app where youtubers could receive custom video requests from their audience. (similiar to [Cameo](https://www.cameo.com) but specifically designed for youtubers) Youtubers can setup their own account and set a price for custom video requests. The app is only used for collecting payments and custom video requests, not for hosting videos.


## Video Explonation

Check [here](https://youtu.be/1M2Fy2L2koU) for a visual explonation of the project

## Project anatomy

The frontend client is split into two seperate pages for two different users : One page for account creation/management and the other for sending video requests to those accounts. I made a list defining the project parts and seperate the functionalities they needed :

- Page for creating/managing the user account. 
    - Handle sign in with google (Generate a google auth token which is verified on the server)
    - Asks for consent to access users youtube account.
    - Fetches account data from the database.
    - Fetches custom video requests from the database.
    - Allows stripe payout account creation.
    - Allows setting custom video prices.
    - Allows rejecting a video request which refunds the stripe payment.
    - Allows fulfilling a videorequest by uploading a video which is sent to the server. (The server uploads it to youtube via. google API)
    

- Page for requesting custom videos
    - Fetches specific account data from the database.
    - Allows fans to make payments to specific accounts with stripe.
    - Allows fans to write a custom video request to a specific account.


- NodeJS server
    - Verify google auth tokens
    - Fetch google account data.
    - Initializes an account on the database.
    - Serve account data from the database.
    - Serve a list of custom video requests from the database.
    - Handle stripe connected account creation.
    - Processes the stripe payments.
    - Handle refunding the stripe payments.
    - Upload a youtube video gotten from client.


- Postgres Database
    - Table of users and their account data.
    - Table of video requests.



## Links

- Backend code is made private
- [Frontend code](https://github.com/Jupemon/video-requester)
