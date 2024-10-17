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

The REST API to the backend is described below.

## Get list of Players

### Request

`GET /player`

    http://localhost:8080/player/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Get specific player

### Request

`GET /player/:id`

### Response

## Create player 

### Request

`POST /player`

### Response

## Update player

### Request

`PUT /player/:id`


### Response

## Delete player

### Request

`DELETE /player/:id`

### Response

## Get list of Teams

### Request

`GET /team`

### Response

## Get specific team

### Request

`GET /team/:id`

### Response

## Get all players on specified team

### Request

`GET /team/:team_id/players`

### Response

## Create team 

### Request

`POST /team`

### Response

## Update team

### Request

`PUT /team/:id`

### Response

## Delete team

### Request

`GET /team/:id`

### Response