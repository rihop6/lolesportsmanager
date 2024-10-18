// Get environment variables and get the port
import * as express from "express";
import * as cors from 'cors';
import 'reflect-metadata';
import playerRouter from "./controllers/player-controller"
import teamRouter from "./controllers/team-controller"
import { dataSource } from "./data-source";

const port = process.env.PORT || 8080;

// establish database connection
dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
});

// Set up express app
const app = express();

// MIDDLEWARE
app.use(express.json());

const corsOptions = {
    origin: process.env.CORS_WHITELIST.split(','), // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Include credentials (like cookies) in requests
};
app.use(cors(corsOptions));

// ROUTING
app.use('/player', playerRouter);
app.use('/team', teamRouter);

// Launch app
app.listen(port, () => {
    console.log(`App up and listening on Port ${port}!`);
});