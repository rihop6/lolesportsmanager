import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    teamname: string

    @Column()
    league: string
    
    @Column()
    country: string

    @Column({ type: 'bytea' })
    logo: Buffer
}