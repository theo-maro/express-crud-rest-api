# express-crud-rest-api

A simple RESTful Express API Server with HTTP to perform basic CRUD operations. I built this as a part of learning backend RESTful services with Express.js

## Welcome to the "eShop Products" API

### Prerequistes

To test this Express server on your local machine, you should install the followings

- [Node](https://nodejs.org/en/) JavaScript runtime
- HTTP client application such as [postman](https://www.postman.com/downloads/) or [Insomia REST](https://insomnia.rest/)
  Optionally you can use any browser of your choice
- [Git](https://git-scm.com/downloads) Version Control

### Installation

Please, follow the following steps to install the application on your local machine

#### 1. Clone the repo

- clone the repository anywhere in your machine

```zsh
$ git clone https://github.com/js4-me/express-crud-rest-api.git
```

#### 2. Initialize the project

- Install all the dependencies

  ```zsh
  $ git install
  ```

#### 3. start the server

- on development enviroment

  ```zsh
  $ npm run dev
  ```

- on production enviroment

  ```zsh
  $ npm run prod
  ```

#### 4. Test the API

Use the following routes to test the application

- => create new product

  ```http
  ::POST /api/products
  ```

- => retrieve all products

  ```http
  ::GET /api/products
  ```

- => retrieve nth products

  ```http
  ::GET /api/products?limit=50
  ```

- => retrieve specific fields

  ```http
  ::GET /api/products?fields=name,brand,price,rating
  ```

- => retrieve sorted products

  ```http
  ::GET /api/products?sort=price
  ```

- => retrieve filtered products

  ```http
  ::GET /api/products?rating=3.8
  ```

- => retrieve product

  ```http
  ::GET /api/products/:product_id
  ```

- => retrieve specific fields

  ```http
  ::GET /api/products/:product_id?fields=name,availability
  ```

- => update product

  ```http
  ::PATCH /api/products/:product_id
  ```

- => delete product

  ```http
  ::DELETE /api/products/:product_id
  ```

- => delete all product

  ```http
  ::DELETE /api/products
  ```
