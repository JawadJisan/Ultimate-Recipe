
# Ultimate Recipe Sharing App


### Live Links
- [Frontend](https://ultimate-recipe.vercel.app/).
- [Backend](https://ultimate-recipe-server-twin.vercel.app/).

![Project Banner](https://i.ibb.co/qp8t8GT/screencapture-localhost-5173-2024-05-27-02-49-21.png)

## Overview

The Ultimate Recipe Sharing App is a platform where users can discover, share, and purchase recipes from around the world. The application features a user-friendly interface, social login integration, and a robust backend to manage user data and recipes. 

## Features

### Success Stories
- Showcases the benefits of using the system.
- Displays recipes count and users count with animated counters using [react-countup](https://www.npmjs.com/package/react-countup).

### Developer Information
- Information about the developer, educational background, experience, and technology stack used.

### User Authentication
- Login and registration system using Google OAuth.
- No additional form routes for login/registration; handled through Navbar.
- Default 50 coins awarded on new user registration.

### Recipes Management
- **Add Recipes**: Private route with a form for adding recipes. Fields include Recipe Name, Recipe Image (uploaded via imgbb), Recipe Details, Embedded YouTube Video Code, Country, and Category.
- **All Recipes**: Public route showing all recipes in a card view with specific fields (Recipe Name, Recipe Image, purchased_by, creatorEmail, Country). Includes "View The Recipe" button with conditional logic based on user status and coin balance.
- **Recipe Detail**: Private route showing detailed information about a recipe, including an embedded YouTube video.

### Purchase Coins
- Allows users to purchase coins via a payment system.
- Options to buy 100 coins for $1, 500 coins for $5, and 1000 coins for $10.
- Updates user's coin balance upon successful payment.

### Additional Features
- User reaction system to add/remove reactions to recipes.
- Filtering system by category and country on the All Recipe page.
- Search system based on recipe title.
- Infinite scrolling system on the All Recipe page.
- Suggestion system on the Recipe Detail page for recipes of the same category or country.

## Technology Stack

- **Frontend**: React, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication with Google OAuth
- **Image Upload**: imgbb API
- **Payment Processing**: Stripe
