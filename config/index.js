const port=(process.env.PORT)?process.env.PORT:3000;
const host=(process.env.host)?process.env.host:"localhost";
const db={
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    databasePort:process.env.DB_PORT,
    databaseUsed:process.env.DB_TYPE

}
module.exports={

    port,
    host,
    db
}