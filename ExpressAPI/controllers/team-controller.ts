import { Router, Request, Response } from "express";
const router = Router();
import { Team } from "../entities/Team";
import { Player } from "../entities/Player";
import { dataSource } from "../data-source";

// Get a list of all teams
router.get("/team", async function (req: Request, res: Response) {
    const team_list = await dataSource.getRepository(Team).find();
    res.status(200).send(team_list);
});

// Get a given team
router.get("/team/:id", async function (req: Request, res: Response) {
    // Get all teams in the Team table
    const team = await dataSource.getRepository(Team).findOneBy({
        id: parseInt(req.params.id),
    });

    // Send the list of teams
    res.status(200).send(team);
});

// Get all players on a team
router.get("/team/:team_id/players", async function (req: Request, res: Response) {
    // Get all players with the given team id
    const players = await dataSource.getRepository(Player).find({ 
        where: { team_id: parseInt(req.params.team_id) } 
    });

    // Send the list of teams
    res.status(200).send(players);
});

// Create a team
router.post("/team", async function (req: Request, res: Response) {
    // Create the team using the body and then save it to the datasource
    const team = await dataSource.getRepository(Team).create(req.body);
    await dataSource.getRepository(Team).save(team);

    // Using the given team id, search for the team in the data source
    let pid = req.body.id;
    const final_team = await dataSource.getRepository(Team).findOneBy({
        id: parseInt(pid),
    });

    // Send the created team
    res.status(201).send(final_team);
});

// Update a team
router.put("/team/:id", async function (req: Request, res: Response) {
    // Get the given team
    const team = await dataSource.getRepository(Team).findOneBy({
        id: parseInt(req.params.id),
    });

    // Merge the given team
    await dataSource.getRepository(Team).merge(team, req.body);
    await dataSource.getRepository(Team).save(team);

    // Get the updated team
    let pid = req.body.id;
    const final_team = await dataSource.getRepository(Team).findOneBy({
        id: parseInt(pid),
    });

    // Send the updated team
    res.status(200).send(final_team);
});

// Delete a team
router.delete("/team/:id", async function (req: Request, res: Response) {
    // Delete the given team
    const results = await dataSource.getRepository(Team).delete(req.params.id);

    // Send the result of the deletion
    res.status(204).send(results)
});

export default router;