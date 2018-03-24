# Dobble - Game Server and Phaser Client

# Setup
You'll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://gitlab.univ-lr.fr/GI1/dobble.git```

## 2. Install node.js and npm:

https://nodejs.org/en/


## 3. Install dependencies:

Navigate to the cloned repo's directory.

Run:

```npm install``` 

## 4. Install a mongo Database

To play with the server api you must have a mongo database (named usersDB) running on [mongodb://localhost:27017/usersDB](mongodb://localhost:27017/usersDB)

### Install a mongo database with docker :

1. Install docker https://docs.docker.com/install/

2. Create a new mongo container:

```bash
# get the mongo image from the docker repo
docker pull mongo
# create and run a new mongo container
docker run --name mongoDobble -p 27017:27017 -v <project-directory>/mongoDB/:/data/db -d mongo
```
3. Then, in a new shell, run:

```bash
# go to mongo shell
docker exec -it mongoDobble mongo
# switch to usersDB
use usersDB 
# create usersDB database
db.users.insert({username: "dummy", email: "dummy@email.dut"})
# check the creation 
show dbs
```


## 5. Run the development server:

5.1 Run all the client (phaser) and the server (express):

```npm run dev```

5.2 Run the client (phaser) only:

```npm run client```

5.3 Run the server (express) only:

```npm run server```

This will run a server so you can run the game in a browser. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.

To run the game, open your browser and enter http://localhost:3000 into the address bar.

When the server is running, you can access it on http://localhost:7777.


# Documentation

## 1. Server Users API


| URL | Method | Request | Response |
|:-:|:-:|:-:|:-:|
| /account/register | POST | ```{username: String, password: String, confirmPassword: String}``` | The newly created user ```{username: String, created: Date, _id: String, _v: Number }```|
| /account/login | POST | ```{username: String, password: String}``` | auth json web token ```{token: String}``` |
| /account/isloggedin | GET | ```Header: Authorization: JWT <jwt>``` | ```{isLoggedIn: Boolean}``` |
| /account/users | GET | | users list ```[{_id: String, created: Date, username: String}]```|

## 2. Server Game API 
| URL | Method | Request | Response |
|:-:|:-:|:-:|:-:|
| /game/join | POST | ```Header: Authorization: JWT <jwt>``` | ```{message: String, hasJoined: Boolean, player: {} from /game/joueur/{username}, status: Number, statusMessage: String, startTime: Number}```|
| /game/jouer | POST | ```Header: Authorization: JWT <jwt>``` | ```{middleCard: [Number]}```|
| /game/infospartie | GET | | ```{id: Number, middleCard:[Number], players [{} from /game/joueur/{username}], status: Number, statusMessage: String, endTime: Number, startTime: Number, ranking: [{username: String, rank: Number}]}``` |
| /game/joueur/{username} | GET | | ```{username: String, score: Number, card: [Number], rank: Number}```|


## 3. Server -> Client Game Socket (port 7777)
| Event | Data | Description |
|:-:|:-:|:-:|
| game/init | { startTime: Number } | when the match will start |
| game/start | /game/infospartie object | when the match start |
| game/updateBoard | /game/infospartie object | when one player win 1 point (so refresh the board) |
| game/finish | /game/infospartie object | when the match finish |

**Every property with 'time' is a timestamp, so :** 
```javascript
    startTime: Number // the date in milliseconds when the match begin,
    endTime: Number // the date in milliseconds when the match end
```


**Note** : *To see all changes before the initial commit, check [Dobble.old repository](https://gitlab.univ-lr.fr/GI1/Dobble.old/tree/master)*