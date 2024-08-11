const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU5jTVZDQnJ4YUpCQUlMb2R1ZURZVitUeW5tL00za3U5TUt2QTQwcGoyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTAyVkEyWk4rWFRRaXFTS3FjdDBzaHU1WkFFbFd0aEVHM1FEcnd4Y293WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLQ1hEUmhCOE5VMjA1RGZhamIwZGlFN3BRTHJXSmRwUlRybHRVN3hscG0wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjYVlFNVcrZDJqWERMOHhSSDcvMXRsUXo5NlJZOXJ3SVJ3MFFRWnJYdkFvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9LVDhQZUUybGczWjNMeUdmYUxualFINUR5OVplZStTNVgzcWJVdWFTVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1vUUZOZlo0N3lsQ0dSSjJuRkZMcjJHWElJUnVZWGx1NTRLOEwxb2FJQzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFQUHVvYnp6V2xBaytkR0R2Rno0YlltNHFrZ3E1aDBIYW5XY2hvRG5Vbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXd2Q2dibVVJWGdpT2hjUE9IOEVCdkNyV1hCOWVQNzExK0M5dHhSN2RYMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVrRUFVN1lHeWpWN3Y2OG5STS83ODhHTEtGc1N4ckZ1Q29MbXpGVkVJQ0dPMzdEQUlJc1BiWEZaWDhPeWpzdUxRTEF1MWhNZTY0TnZIWTh1dGQ2RkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODQsImFkdlNlY3JldEtleSI6ImN3Q2UyVTdjcXBkUWJwdXhZeHRabmhSRGdvZFI2SlhPSnJaTkpXeTZKZjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Inl4Tng0UkFrVDVLX0lSWHd4SU1PdlEiLCJwaG9uZUlkIjoiZTFlN2U3NzQtZWI0Yi00ZWRmLWIyMmUtYzA5OGQxYWY0MmM1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjR6UTBTUUo0d1RsV0EySXdHYmpXYUluN2hWST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQytDVXhWRHVEVWNsd0YyWHExeEdaK0ZQSmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUzRBNTlITEwiLCJtZSI6eyJpZCI6IjI3Njg4NDYyMzc2OjM2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJWHRzN3dCRUwyWTRyVUdHQklnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ4S0RKOW5LRXBpa1NVVDhTSkt1UHFBOGoveWEzL3hHa1FpQmtEeVRwaEdvPSIsImFjY291bnRTaWduYXR1cmUiOiJ0ZHBna0RrQnRhamRXV21GMmZJQlpBYXFUYnZ0cy9nUVErNzBXMjJQZ0dxckVoQjUycE9EVUJPNWtZWlNtRkphQmRMRVhTMkhINWVROTR0Qk1udi9BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieEI4UTZad1JZcWFuM3U0YlNka3IvNWJJNStmeGFFWSs2VDdkOWdhQVNGcEFLTXYwZGRNcjZjdDdrbzk1ellMVHZkcXBJS1JSTFU4OW9lSWlhQno4RFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzY4ODQ2MjM3NjozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjU2d5Zlp5aEtZcEVsRS9FaVNyajZnUEkvOG10LzhScEVJZ1pBOGs2WVJxIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMzcwNTY5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9qMyJ9',
    PREFIXE: process.env.PREFIX || "!,.",
    OWNER_NAME: process.env.OWNER_NAME || "Tristan",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "27634624586",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TRISTAN-BOT',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

