

# Video requesting application

## The idea behind the project

I noticed that youtubers need more ways to generate revenue from their audience. I decided to create a video requesting site for it. The idea was to create a web app where youtubers could receive custom video requests from their audience. (similiar to [Cameo](https://www.cameo.com) but specifically designed for youtubers) Youtubers can setup their own account and set a price for custom video requests. The app is only used for collecting payments and custom video requests, not for hosting videos.

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
    - Table of users and their account data.
    - Table of video requests.
    - Holds stripe account data for processing payouts to connected accounts.


 ### Tools & Dependencies used: 

- Built with **React** & **Node**

- **Express** For creating the API.

- **Bootstrap** For easy responsive design and cool components.

- **Google-auth-library** Handles sign in / account creation with google

- **Stripe** For accepting online payments, creating connected accounts and making payouts to those accounts.

- **Knex** Handle database transactions.

- **Heroku** Hosts the node server.

- **GH-pages** Hosts the frontend client.



## Links

- [Backend code](https://github.com/Jupemon/Video-Requester-Backend)
- [Frontend code](https://github.com/Jupemon/video-requester)



- ## Frontend Anatomy

- **localstorage** = Data stored on browser memory

    - **Token_id** = gotten via google signin, used to verify user on certain backend routes


- **Views Folder** = Renders different views for different cases using the react components.

    - ManageProfile = Allows creating a new profile, and managing it
    
    - ViewProfile = Allows sending videorequests to a profile.

    - NotFound = Served if route wasn't valid

- **Components Folder**

    - **CreateVideoRequest** = Allows creating new videorequests

    - **LoginScreen** = Allows user to create & sign in with their profile

    - **Profile** = Renders information about the profile

    - **VideoRequests Folder** = Renders the created videorequests and all the info about them


## Future plans

I am currently adding Redux for state management
