# Buyzy E-commerce Web Application

## Description
 Buyzy is a full-stack responsive e-commerce web application designed to provide a smooth and intuitive shopping experience for users. The platform supports features like browsing products, managing a shopping cart, and secure checkout. It built using modern web technologies to ensure high performance, scalability, and ease of use for both customers and administrators.

## Features
- Shopping cart
- Product reviews and ratings
- Top products carousel
- Products slider with pagination and limit
- Products category
- Product search feature
- Order Creation 
- Checkout process (shipping, payment method, etc)
- User profile with orders
- Payment Integration with iyzico
- Authentication - Authorization with JWT
- Database seeder (products & users)

## Installation
### Prerequisites
Ensure you have the following installed on your system:

1- Node.js (v14 or higher)
  Download Node.js
  
2- MongoDB
  Download MongoDB or use a cloud service like MongoDB Atlas.
  
3- Git
  Download Git

4- Package Manager
   Comes with Node.js. Use either npm or install yarn

### Clone the Repository
  Open a terminal and navigate to the directory where you want to store the project.
  Clone the repository:
```
git clone https://github.com/burakcanbz/E-Commerce.git

cd ecommerce-web-app
```
### Env Variables
  Rename the .env.example file to .env and add the following
  ```
  NODE_ENV = development
  PORT = 5000
  MONGO_URI = your mongodb uri
  JWT_SECRET = 'somekey'
  ```

### Install Dependencies (frontend & backend)
  ```
  npm install
  cd frontend
  npm install
  ```
### Start the app:
  From the main project directory. Server runs on PORT 3000 and client runs on PORT 5000.
  ```
  npm run server
  npm run client
  ```
### Seed the Database
  Seeder script can be used for creating some users and products.
  ### Import data
  ```
  npm run data:import
  ```
  
  ### Destroy data
  ```
  npm run data:destroy
  ```
  
  or you can only use from main directory
  
  ```
  node api/seeder.js
  ```



