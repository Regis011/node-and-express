
# Node, Express and MongoDB Starter

======

#### Simple install of projects.
```zsh
> `git clone git@github.com:Regis011/node-and-express.git`

> `cd oden-company-overview`

> `npm install`
```
**Configure database.**
Find the *`config-BACK.js`* file under the config folder and rename to the *`config.js`*. Then open the file in a text editor and replace ***DB_USER***, ***DB_USER_PASSWORD*** , ***DB_NAME*** and ***DB_URL*** value with your database log in value.
Database Schema is *`_id, name and course`*. To change this and enter your own schedule go to database.js file located under config map. In this file I only export a table from the database called *`"consults"`*. Change this to your own and if you will to get more data and tables just follow this structure.

To start project run
```
> `npm start`
```
Enjoy!

======

### List of Packages

List of all packages in projects:

|dependencies                   |devDependencies              |
|-------------------------------|-----------------------------|
|bcrypt-nodejs                  |babel-cli                    |
|body-parser                    |babel-preset-env             |
|connect-flash                  |babel-preset-stage-0         |
|cookie-parser                  |nodemon            |
|ejs                            |                   |
|express-session                |                   |
|lodash                         |                   |
|mongoose                       |                   |
|morgan                         |                   |
|passport                       |                   |
|passport-google-oauth20        |                   |
|passport-local                 |                   |
