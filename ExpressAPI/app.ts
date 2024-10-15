// Get environment variables and get the port
import * as express from "express";
import 'reflect-metadata';
import playerRouter from "./controllers/player-controller"
import teamRouter from "./controllers/team-controller"

const port = process.env.PORT || 8080;

// Set up express app
const app = express();

// MIDDLEWARE
//app.use(express.json());

// ROUTING
app.use('/player', playerRouter);

const teamController = require('./controllers/team-controller');
app.use('/team', teamRouter);

// Launch app
app.listen(port, () => {
    console.log(`App up and listening on Port ${port}!`);
});