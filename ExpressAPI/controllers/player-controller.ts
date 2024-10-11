import * as express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { Player } from "../entities/Player";
import { dataSource } from "../data-source";

// Get a list of all players
router.get("/player", async function (req: Request, res: Response) {
    const player_list = await dataSource.getRepository(Player).find();
    res.status(200).send(player_list);
});

// Get a given player
router.get("/player/:id", async function (req: Request, res: Response) {
    // Get all players in the Player table
    const player = await dataSource.getRepository(Player).findOneBy({
        id: parseInt(req.params.id),
    });

    // Send the list of players
    res.status(200).send(player);
});

// Create a player
router.post("/player", async function (req: Request, res: Response) {
    // Create the player using the body and then save it to the datasource
    const player = await dataSource.getRepository(Player).create(req.body);
    await dataSource.getRepository(Player).save(player);

    // Using the given player id, search for the player in the data source
    let pid = req.body.id;
    const final_player = await dataSource.getRepository(Player).findOneBy({
        id: parseInt(pid),
    });

    // Send the created player
    res.status(201).send(final_player);
});

// Update a player
router.put("/player/:id", async function (req: Request, res: Response) {
    // Get the given player
    const player = await dataSource.getRepository(Player).findOneBy({
        id: parseInt(req.params.id),
    });

    // Merge the given player
    await dataSource.getRepository(Player).merge(player, req.body);
    await dataSource.getRepository(Player).save(player);

    // Get the updated player
    let pid = req.body.id;
    const final_player = await dataSource.getRepository(Player).findOneBy({
        id: parseInt(pid),
    });

    // Send the updated player
    res.status(200).send(final_player);
});

// Delete a player
router.delete("/player/:id", async function (req: Request, res: Response) {
    // Delete the given player
    const results = await dataSource.getRepository(Player).delete(req.params.id);

    // Send the result of the deletion
    res.status(204).send(results)
});