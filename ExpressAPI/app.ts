// Get environment variables and get the port
import * as express from "express";
import 'reflect-metadata';
import { Request, Response } from "express";
import { Team } from "./entities/Team";
import { Player } from "./entities/Player";
import { dataSource } from "./data-source";

const port = process.env.PORT || 8080;

// Set up express app
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTING
const playerController = require('./controllers/player-controller');
app.use('/player', playerController);

const teamController = require('./controllers/team-controller');
app.use('/team', teamController);

// Launch app
app.listen(port, () => {
    console.log(`App up and listening on Port ${port}!`);
});