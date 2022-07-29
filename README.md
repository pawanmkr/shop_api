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
- ## that's all...now, let's start testing

by default the PORT it's using is 9000 you can also change it
- open postman and enter this url `http://localhost:9000/user/signup/`
- switch to POST request, right-side of the address bar
- select body -> raw -> JSON
- use the expample in snapshot to do the same to create & login the user
<img width="1440" alt="Screenshot 2022-07-29 at 2 37 54 PM" src="https://user-images.githubusercontent.com/53852047/181815110-7fbc9717-5fe2-436a-aedf-540e8c8f9295.png">

- when you again enter same data
<img width="1440" alt="Screenshot 2022-07-29 at 2 38 18 PM" src="https://user-images.githubusercontent.com/53852047/181815784-1f088ec9-48d8-4ded-8a80-273049103b46.png">

- login
<img width="1440" alt="Screenshot 2022-07-29 at 2 38 41 PM" src="https://user-images.githubusercontent.com/53852047/181815949-d98bf82a-cbd7-4b03-a8af-a4b8fd91aa15.png">

- copy that token you received
- switch to headers and add `Authorization` in key field and in value `Bearer (and then token just like see in picture)`
<img width="1440" alt="Screenshot 2022-07-29 at 2 39 51 PM" src="https://user-images.githubusercontent.com/53852047/181816152-64aae280-c664-4cd3-aa32-58590e422c2b.png">

- let's add a product now. goto form-data, enter data and send
<img width="1440" alt="Screenshot 2022-07-29 at 2 47 43 PM" src="https://user-images.githubusercontent.com/53852047/181816673-98670aa7-2ff4-4bdf-8933-ff69e2a6d516.png">

- to see all the products `switch to GET and use /products/ in url`
<img width="1440" alt="Screenshot 2022-07-29 at 2 42 18 PM" src="https://user-images.githubusercontent.com/53852047/181817082-0f7c838f-41c2-43e6-a8aa-deafdc5c1087.png">

- to see Id wise `enter productId -> /products/productId`
<img width="1440" alt="Screenshot 2022-07-29 at 2 43 39 PM" src="https://user-images.githubusercontent.com/53852047/181817440-2e991eb0-9b77-4c4c-b061-eae31997b999.png">

- to update the product `switch to PATCH and use /products/productId in url` & enter the data in key:value pair whichever you want to update but first make sure to switch back to `body -> raw -> JSON from form-data` unless you don't want to update the picture itself
<img width="1440" alt="Screenshot 2022-07-29 at 2 54 31 PM" src="https://user-images.githubusercontent.com/53852047/181817733-42a3be33-62be-4829-a4ac-1d83b3c95e1d.png">

- to delete the product `switch to DELETE and use /products/productId in url`
<img width="1440" alt="Screenshot 2022-07-29 at 2 54 48 PM" src="https://user-images.githubusercontent.com/53852047/181818286-184827c2-a40f-44d9-bc20-e48446b4bfa3.png">

- ### similarly you can with orders also see below snapshots for reference

- create order
<img width="1440" alt="Screenshot 2022-07-29 at 2 58 16 PM" src="https://user-images.githubusercontent.com/53852047/181818357-b8b71c74-de70-4a52-82c3-6115a50d0b5b.png">

- get all orders
<img width="1440" alt="Screenshot 2022-07-29 at 2 55 34 PM" src="https://user-images.githubusercontent.com/53852047/181818467-558a2e59-f8ce-4035-a8e6-b22c40a01058.png">

- get specific order
<img width="1440" alt="Screenshot 2022-07-29 at 2 56 08 PM" src="https://user-images.githubusercontent.com/53852047/181818527-58c7505c-323b-4362-a6cc-c0a69896db6c.png">

- delete/cancel order
<img width="1440" alt="Screenshot 2022-07-29 at 2 59 19 PM" src="https://user-images.githubusercontent.com/53852047/181818648-4bce0a28-6a7d-4228-b37c-125f1efa14be.png">






