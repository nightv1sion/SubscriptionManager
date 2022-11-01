# SubscriptionManager 
is a web application that allows you to keep information about all your subscriptions in one place.

# How to run using Docker:

- clone this repository
- go to the clonned repository folder and open terminal there
- create a https certificate
         
         dotnet dev-certs https --clean
         
         dotnet dev-certs https -ep ./backend/conf.d/https/subscriptionmanager.pfx -p N1ghtv1s1on!
         
         dotnet dev-certs https --trust
         
- run docker-compose

      docker-compose up --build
- wait for it to start and go to "http://localhost:3000/"


# Brief Overview

1) Go to 'Sign In' Link at the top left corner
2) Register and login
3) Categories Table 
- To Create - Click 'Add a new category' input form and start typing name, press "Enter" to save Category
- To Edit and Delete - Click dropdown button at the end of the existing category in table
4) Subscriptions Table
- To Create - Click 'Add a new subscription' input form and start typing name, press "Enter" to save Category (Enter start, end dates and price in pop-up form)
- To Edit and Delete - Click an existing subscription and press Edit or Delete button in pop-up form

# Technologies (+ Docker + Unit Tests (xUnit, FakeItEasy, FluentAssertions))
![image](https://user-images.githubusercontent.com/92179208/186512619-00bed7fe-1caa-46bd-aa3b-0599ef74ccae.png)
