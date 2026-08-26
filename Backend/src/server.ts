import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";


const Port = 4000;

async function startserver(){
    try {
        await prisma.$connect();

        console.log("DataBase Connected : ");

        app.listen(Port, ()=>{
            console.log("Server is Running");
        });
    } catch (error) {
        console.log("DataBase Connection Fail",error);
    }
}

startserver();