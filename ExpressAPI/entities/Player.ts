import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    name: string
    
    @Column()
    role: string

    @Column()
    team_id: number

    @Column({ type: 'bytea' })
    avatar: Buffer
}