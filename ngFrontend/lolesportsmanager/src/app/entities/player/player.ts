export class Player {
    id: number;
    username: string;
    name: string;
    role: string;
    team_id: number;
    avatar: Buffer;

    constructor(id: number,
                username: string,
                name: string,
                role: string,
                team_id: number,
                avatar: Buffer) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
        this.team_id = team_id;
        this.avatar = avatar;
    }
}
