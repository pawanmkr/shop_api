# Shop_API

A rest API for shop with multiple requests, errors handeld, utilized authentication and much more :)

## Usage Guide

- first, clone the repository into your pc
- open terminal in this same project folder
- run this commnad to install the dependencies: `npm install`

- now you need [MongoDB Atlas](https://cloud.mongodb.com/) quickly make an account if you don't have one
- login and create new cluster, you'll find create button under Atlas > Database section on the dashboard
- choose shared option(it's free) & proceed with the default options along with a password(this is required in the next step)
- after creating click on connect -> connect your application -> copy the code from there

- go to app.js file and replace the code you copied in mongo.connect() function just like i have done
- go to nodemon.js to replace the mongo password with yours or simply, you can also add directly in the mongo.connect() function in the place of `+ ${process.env.MONGOPASS} +`
- one last thing required to test the API is [Postman](https://www.postman.com/downloads/postman-agent/) or some other API testing tool
- install postman create account if required to use
- ### that's all...now, let's start testing
