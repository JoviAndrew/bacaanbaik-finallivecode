# bacaanbaik-finallivecode

Final Livecode phase 2 red fox 2018

This project is created using `nodejs`, `vue` as the client framework and `express` for the server.

To run the program locally, firstly you must clone this project, then type in `npm install`. To run the serve type `npm start` in the server folder. The server will run `nodemon` package. If you have not installed nodemon then, please install nodemon by typing `npm i nodemon`. To run the client, you must type in `npm run serve` to run it and type in the url in your browser. Usually its `http://localhost:8080`

The environment variables used within this project are:
    DB_USER=livecodeAdmin
    DB_PASS=livecodePass
    SECRET=hacktv8-livecode
    PORT=3000
    GCS_BUCKET=bacaan-baik
    PROJ_ID=firebase-asset-management-syst
    KEY_FILE_NAME=firebase-asset-management-syst-abd8bcf4cb5c.json

Here are the lists of dependencies used in this project:
#### Server

    @google-cloud/storage
    bcryptjs
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    multer
    
#### Client

    axios
    sweetalert
    vue
    vue-router
    vuex

## End Point

#### User
| Action | Path | Description |
|---------|:-----:|:----------:|
|POST|/user/login|Login user|
|POST|/user/register|Register new user|

#### Book
| Action | Path | Description |
|---------|:-----:|:----------:|
|GET|/book/show|Get all books|
|GET|/book/show/:id|Get one book data in detail|
|POST|/book/add-book|Add new book|
|POST|/book/add-comment/:id|Add Comment to a book|
|PUT|/book/like/:id|Like a book|
|PUT|/book/unlike/:id|Unlike a book|
|POST|/book/show/:title|Search a book by its title|
|DELETE|/book/delete/:id|Delete book|
|DELETE|/book/delete-comment/:id|Delete comment|