# lolesportsmanager

# INSTALLATION INSTRUCTIONS
## 1. Postgres (pgAdmin) setup
Set up pgAdmin. Installation instructions can be found here: https://www.pgadmin.org/download/.

Create a new database in pgAdmin and create 2 new tables using the following queries:
```sql
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    team_id INTEGER NOT NULL,
    avatar BYTEA
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    teamname VARCHAR(255) NOT NULL,
    league VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    logo BYTEA
);
```

## 2. Create .env variables
In the ExpressAPI folder, create a .env file. Paste the following into the .env file, filling out the relevant information.
```
PORT=(port to run the express backend on- usually 8080)
DB_HOST=(localhost if running locally)
DB_PORT=(port for database- usually 5432)
DB_USER=(username for postgres- usually postgres)
DB_PASSWORD=(password you set on postgres)
DB_DATABASE=(database name you chose)
```

# REST API

The REST API to the backend is described below. Detailed examples are available in the postman dump in the docs folder. These can be imported and viewed in postman.

## Get list of Players

### Request

`GET /player`

    GET http://localhost:8080/player

## Get specific player

### Request

`GET /player/:id`

    GET http://localhost:8080/player/1

## Create player 

### Request

`POST /player`

    POST http://localhost:8080/player
    body: {
        "username": "Username",
        "name": "Name",
        "role": "Fill",
        "team_id": 1,
        "avatar": null
    }

## Update player

### Request

`PUT /player/:id`

    PUT http://localhost:8080/player/1
    body: {
        "username": "NewUsername",
        "name": "NewName",
        "role": "Mid",
        "team_id": 2,
        "avatar": null
    }

## Delete player

### Request

`DELETE /player/:id`

    DELETE http://localhost:8080/player/1

## Get list of Teams

### Request

`GET /team`

    GET http://localhost:8080/team

## Get specific team

### Request

`GET /team/:id`

    GET http://localhost:8080/team/1

## Get all players on specified team

### Request

`GET /team/:team_id/players`

    GET http://localhost:8080/team/1/players

## Create team 

### Request

`POST /team`

    POST http://localhost:8080/team
    body: {
        "teamname": "Teamname",
        "league": "League",
        "country": "Country",
        "logo": null
    }

## Update team

### Request

`PUT /team/:id`

    PUT http://localhost:8080/team/1
    body: {
        "teamname": "NewTeamname",
        "league": "NewLeague",
        "country": "NewCountry",
        "logo": null
    }

## Delete team

### Request

`DELETE /team/:id`

    DELETE http://localhost:8080/team/1
