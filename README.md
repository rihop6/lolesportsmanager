# lolesportsmanager

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