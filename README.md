# Roserade Shop

This is my personal project, developed from the course by Brad Traversy on Udemy. You can see the course [here](https://www.udemy.com/course/mern-ecommerce).

## Overview

Roserade Shop is a e-commerce website for fashion clothes using MERN stack.

## To-Do List

-   [ ] Deconstruct cart item to into component.
-   [ ] Card payment
-   [ ] Modify cart item quantity inside user's cart
-   [ ] Separate Cart feature into guest's cart and user's cart

## Features

-   Shopping cart for guest (cart items will be stored on LocalStorage if user is not login)
-   Shopping cart for user (still working on this...)
-   Search for product
-   Product review and rating
-   User can see their orders in profile
-   Check out process(shipping, payment method, purchase)
-   Paypal integration
-   CRUD operations for Admin (products, users, brands, categories)
-   Mark order as delivered
-   Security (Implement Authentication and Authorization)

### Note

This is my personal project, and I'm still working on it by adding more features.

## Technologies

-   React
-   Mongoose
-   Redux Toolkit
-   React-Bootstrap
-   React-Router-DOM v6
-   Express

## Screenshots

Sample screen shot

![](https://i.imgur.com/TiFKjUk.png)
![](https://i.imgur.com/LNHNq13.png)
![](https://i.imgur.com/Sf9GL7B.png)

## Installation

### Env Variables

Create a .env file and add the following variables:

```
NODE_ENV = development
PORT = your port
MONGO_URI = your mongodb uri
JWT_SECRET = 'iamlostinthisworld'
PAYPAL_CLIENT_ID = your paypal client id
```

### Frontend/Client

```
cd client
npm i
```

The frontend is located at port 3000

### Backend/Server

```
npm i
```

The backend is located at port 5000

### Run

```
npm run dev
```

### Database

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

Users in demo data:

```
admin@admin.com
123

quoc@bao.com
123

bao@quoc.com
123
```

## Acknowledgements

I would like to thank Brad for the fantastic course he had prodived. This course is very well designed and informative, it covers all the necessary topics for building a e-commerce website with MERN stack. An unforunate aspect of this course is that some parts of its seem a little bit outdated which are: React-Router-DOM v5, Redux, Paypal Button. And for these reasons, I've re-writtten and refactor all of it. Nonetheless, It's still an amazing course.
