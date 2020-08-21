
# Video requesting application

## The idea behind the project

I noticed that youtubers need more ways to generate revenue from their audience. I decided to create a video requesting site for it. The idea was to create a web app where youtubers could receive custom video requests from their audience. (similiar to [Cameo](https://www.cameo.com) but specifically designed for youtubers) Youtubers can setup their own account and set a price for custom video requests.

## How it works

1. Sign in using your google account and give the application access to your google data. 

2. This generates a new account on the database and signs you in.

3. Click on the link to create a stripe payout account. Creating it allows you to receive payouts through stripe.

4. Set a price for custom video requests. This is the amount needed to pay in order to leave a custom video request.

5. This generates an URL address which you can share with your audience.
 
6. Your fans can now write you their custom video requests in exchance for payment using this URL.

7. All of these custom video requests will show up on your account page.

8. You can reject any of the video requests which you don't want to fulfill, this action refunds the stripe payment.

9. Accept the video requests which you plan on fulfilling.

10. Accepting a video request processes the payment and money is added to your stripe account.

11. Fulfill the video requests by uploading the custom videos to your youtube channel.


## How i built it

I started by defining the project parts and the functionalities they needed :

- Page for creating/managing the user account. 
    - Handle signin with Google tokens.
    - Fetches account data from the database.
    - Fetches custom video requests from the database.
    - Allows stripe payout account creation.
    - Allows setting custom video prices.
    - Allows rejecting a video request which refunds the stripe payment.
    - Allows accepting a video request which processes the stripe payment.
    

- Page for requesting custom videos
    - Fetches specific account data from the database.
    - Allows fans to make payments with stripe.
    - Allows sending a custom video request to the database.


- NodeJS server
    - Fetch from google accounts
    - Initializes an account on the database.
    - Serve account data from the database.
    - Serve custom video requests from the database.
    - Handle stripe account creation.
    - Processes the stripe payments.
    - Handle refunding the stripe payments.


- Postgres Database
    - Contains account data.
    - Array of requested videos.
    - Holds stripe account data for processing payouts to connected accounts.


 ### Tools & Dependencies used: 

- Built with **React** & **Node**

- **Bootstrap** For easy responsive design and the components look cool.

- **Google OAuth** Allows signning in with google

- **Stripe** for accepting online payments and handling payouts for connected stripe accounts.

- **Knex** Database transactions.

- **Heroku** Hosts the node server.

- **GH-pages** Package for hosting on github pages.


## Links

- [Backend code](https://github.com/Jupemon/Video-Requester-Backend)
- [Frontend code](https://github.com/Jupemon/video-requester)

## Future plans

I plan on adding Hashing for the database and splitting the project into two seperate frontend clients. This should reduce the project size and increase security.