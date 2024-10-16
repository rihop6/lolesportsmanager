import { Router, Request, Response } from "express";
const router = Router();
import { Player } from "../entities/Player";
import { dataSource } from "../data-source";

// Get a list of all players
router.get("/", async function (req: Request, res: Response) {
    const player_list = await dataSource.getRepository(Player).find();
    res.status(200).send(player_list);
});

// Get a given player
router.get("/:id", async function (req: Request, res: Response) {
    // Get all players in the Player table
    const player = await dataSource.getRepository(Player).findOneBy({
        id: parseInt(req.params.id),
    });

    // Send the list of players
    res.status(200).send(player);
});

// Create a player
router.post("", async function (req: Request, res: Response) {
    // Extract parameters from the body
    const { username, name, role, team_id, avatar } = req.body;

    // Exit if required fields are missing
    if(!username || !name || !role || !team_id) {
        res.status(400).send({message: 'username, name, role, and team_id are a required fields!' });
        return;
    }

    // Try to create the new player in the db, if not catch error with status 500
    try {
        const playerEntity = new Player();
        playerEntity.username = username;
        playerEntity.name = name;
        playerEntity.role = role;
        playerEntity.team_id = team_id;
        playerEntity.avatar = avatar;

        const dbPlayer = await dataSource.getRepository(Player).save(playerEntity);
        res.status(201).send(dbPlayer);
    } catch(error) {
        res.status(500).send({ message: 'Error creating player', error });
    }
});

// Update a player
router.put("/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    try {
        // Get the given player
        const player = await dataSource.getRepository(Player).findOneBy({
            id: parseInt(id),
        });

        // Merge the given player
        const merge = await dataSource.getRepository(Player).merge(player, req.body);
        await dataSource.getRepository(Player).save(player);

        // Send the updated player
        res.status(200).send(merge);
    } catch(error) {
        res.status(500).send({ message: 'Error updating team', error });
    }
});

// Delete a player
router.delete("/:id", async function (req: Request, res: Response) {
    // Delete the given player
    const results = await dataSource.getRepository(Player).delete(req.params.id);

    // Send the result of the deletion
    res.status(204).send(results)
});

export default router;