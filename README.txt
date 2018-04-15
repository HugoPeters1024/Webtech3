GROUP_ID = 12
STUDENTS = [
  Hugo Peters : 5917727,
  Robin Sikkens : 4228189,
  Wouter Ubbink : 5942705 ]

URL = webtech.science.uu.nl/group12

PREFIX NOTE:
This website is front-end wise more build up like an application than a website.
This 'wrong' way of doing things was only noticed after we were gone too far with the devolpment and
decided to keep it that way.
This is why our server responds more like an API than a webserver. But for a practicallities, to a user
it should go unnoticed.
This also justifies the statefullness of our website which is described below with states.js

DATABASE:
See the following files
  database.html
  database.pdf
  MAIN.sql

BACK-END DESCRIPTION:
test_main.js : implements basic NodeJS and Express features and tunnels requests to corresponding subroutines.
database.js  : is imported by test_main.js and implements all subroutines and SQL querries.

FRONT-END DISCRIPTION:

-HTML
html documents are all placeholders that replace the main-content class of index.html

-CSS
main.css : implements all covering CSS
pages.css : Adds content specific CSS

-JAVASCRIPT
ajax.js : implements all API calls and building up content from their responses.
buttons.js : implements the functionality of the nav bar
classes.js : define the datastructures for products and categories
state.js   : a small wrapper that allows information to be saved in the localStorage for session management for example.

I refuse to the give the passwords of all our users as requested.
Please follow up with us if you would like to comment on that.

EXTRA FEATURES:
Any user can post comments on products and they will be displayed with the corresponding username.

F.A.Q.
Why did you implement your own session management?
  I couldn't get any library to work, so we decided to do it ourselves. I believe this method to be quite waterproof, I'm curious if you can prove us otherwise :)
