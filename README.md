# Buyzy E-commerce Web Application
**Important Note:** Auth is provided for Android devices, Chrome, and Mozilla.  
iOS devices and Safari have limitations regarding cross-site cookies due to [Intelligent Tracking Prevention](https://www.apple.com/safari/docs/Safari_White_Paper_Nov_2019.pdf).

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
- Demo Payment Integration with iyzico
- Authentication - Authorization with JWT
- Database seeder (products & users)

## Installation
### Prerequisites
Ensure you have the following installed on your system:

1- Node.js (v14 or higher)<br>
  Download Node.js
  
2- React 18 + required<br>
  Upgrade your react version to react 18 for local development.
  
4- MongoDB<br>
  Download MongoDB or use a cloud service like MongoDB Atlas.
  
5- Git<br>
  Download Git

6- Package Manager<br>
   Comes with Node.js. Use either npm or install yarn. Select which one is suitable with your OS.

### Clone the Repository<br>
  Open a terminal and navigate to the directory where you want to store the project.
  Clone the repository:
```
git clone https://github.com/burakcanbz/Buyzy-e-commerce.git

cd your_project_name
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



