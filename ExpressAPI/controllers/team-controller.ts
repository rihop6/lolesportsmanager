import { Router, Request, Response } from "express";
const router = Router();
import { Team } from "../entities/Team";
import { Player } from "../entities/Player";
import { dataSource } from "../data-source";

// Get a list of all teams
router.get("", async function (req: Request, res: Response) {
    const team_list = await dataSource.getRepository(Team).find();
    res.status(200).send(team_list);
});

// Get a given team
router.get("/:id", async function (req: Request, res: Response) {
    // Get all teams in the Team table
    const team = await dataSource.getRepository(Team).findOneBy({
        id: parseInt(req.params.id),
    });

    // Send the list of teams
    res.status(200).send(team);
});

// Get all players on a team
router.get("/:team_id/players", async function (req: Request, res: Response) {
    // Get all players with the given team id
    const players = await dataSource.getRepository(Player).find({ 
        where: { team_id: parseInt(req.params.team_id) } 
    });

    // Send the list of teams
    res.status(200).send(players);
});

// Create a team
router.post("", async function (req: Request, res: Response) {
    // Extract parameters from the body
    const { teamname, league, country, logo } = req.body;

    // Exit if required fields are missing
    if(!teamname) {
        res.status(400).send({message: 'Teamname is a required field!' });
        return;
    }

    // Try to create the new team in the db, if not catch error with status 500
    try {
        const teamEntity = new Team();
        teamEntity.teamname = teamname;
        teamEntity.league = league;
        teamEntity.country = country;
        teamEntity.logo = logo;

        const dbTeam = await dataSource.getRepository(Team).save(teamEntity);
        res.status(201).send(dbTeam);
    } catch(error) {
        res.status(500).send({ message: 'Error creating team', error });
    }
});

// Update a team
router.put("/:id", async function (req: Request, res: Response) {
    const id = req.params.id;
    try {
        // Get the given team
        const team = await dataSource.getRepository(Team).findOneBy({
            id: parseInt(id),
        });

        // Merge the given team
        const merge = await dataSource.getRepository(Team).merge(team, req.body);
        await dataSource.getRepository(Team).save(team);

        // Send the updated team
        res.status(200).send(merge);
    } catch(error) {
        res.status(500).send({ message: 'Error updating team', error });
    }
});

// Delete a team
router.delete("/:id", async function (req: Request, res: Response) {
    // Delete the given team
    const results = await dataSource.getRepository(Team).delete(req.params.id);

    // Send the result of the deletion
    res.status(204).send(results)
});

export default router;