import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config()

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DATABASE,
    entities: ["./entities/*.ts"],
    logging: false,
    synchronize: false,
});