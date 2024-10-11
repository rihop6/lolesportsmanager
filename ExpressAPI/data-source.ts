import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DATABASE,
    entities: ["ExpressAPI/entities/*.js", "ExpressAPI/entities/*.js"],
    logging: false,
    synchronize: false,
});