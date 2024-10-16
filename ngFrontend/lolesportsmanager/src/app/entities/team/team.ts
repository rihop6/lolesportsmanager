export class Team {
    id: number;
    teamname: string;
    league: string;
    country: string;
    logo: Buffer;

    constructor(id: number,
                teamname: string,
                league: string,
                country: string,
                logo: Buffer) {
        this.id = id;
        this.teamname = teamname;
        this.league = league;
        this.country = country;
        this.logo = logo;
    }
}
