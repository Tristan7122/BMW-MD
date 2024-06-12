const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0NEZndzbHRhMSsvREluaWwxWE93U29ncTY2QjZLYmdWdmhpMkZqU0JXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGI0TlQ1aFZ0S254SkNRZGJXMGE3UXBHZnBPeER5N3EzeDRCL0I2MmZuQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QjlhcTUxZzVFVU9SY0Fha3hOQ28rWXVzUVlMSnpzTkEvZ29jc1NZSUZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVc2tadGlKWW9Qak5raFZjTDNiL011MklvanFZWFFoclhNQUhlQy9zdHdrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDNUlQc29xSmt4RlpXZk9DVW5RcGtMVG1FMDg3eTROa3ByK1M4NkhubG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpqN1BiaWt6T3A1OWp6YjltSndpdStlQWNocEFWWjVvUWQxeFoxTWJPaXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZtdGd0aVRudG1IYXdYRVBFQXVmTC9YTjNJSVNvNkF2eWIzcjhRc20yQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnE2SWJqUlNDS0g2N0FGUDlBcTlIVVU4NDNYOUpLMmhiU0F5ZlNkMy9VOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNZRDJ4UlphaUtwbUZMMzM3Uk4zY1U2OWtnWnh5QmxJd1c4LzJubHNkNjVXWEZ5NFA4Ty9aQjV0ZWJDaVNuQXMweVZYQjJUZVMzcVNTYnRZb3h0eWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiIrN3hPeFpoSDdiaC81N1pic285REhNMFVqWEJMa2VNRWdQdHhCU2UrbUlFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NjYwMTY5NTI1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBN0VCRUZGRkE3RDBFMDEyMkQ1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTgyMTk4NzZ9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImFKbTd6a2ZPU1hHNDc5Ykp3UU55YkEiLCJwaG9uZUlkIjoiZWIxMTBkNDktNTVkYy00NDY1LTllMWMtMzZmNjE4MmNjNzMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdHTnhvR0VxeEhTMHRubHJlOTVRZCt1eHBNaz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhXQ2ltVHBYYVVRY1dTR2RDQ28vMkt4dEhVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSW1VMFBJSEVOTG9wN01HR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiK2dXdU9lL2pRREhVMXlZMFFTaDlCdjhZSHF0TXF4eWhQeGFaWlJKS0FRZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYzJXRENOQ1Yxa005bXRTbjV3SDRGdldJOUVLakZGekQrMVhVSzBEeXBqZHRuRFE1MmtJQVZ0anFoWm1KZlpPTVVBckw0eWcwOTE5Z2lsOVBDa2oxaGc9PSIsImRldmljZVNpZ25hdHVyZSI6IldFdDlRT3VYanV2SEY0VTZmMUpDOFVJdlZzdXo4eExzQWMraTJsWDl1RmJKcTN2S1NWblFqZWt2T2QvMFIzbkhXdENuY09sdENPUnVXbGljV1B0M2h3PT0ifSwibWUiOnsiaWQiOiIyNzY2MDE2OTUyNTozNEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIuIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjYwMTY5NTI1OjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZvRnJqbnY0MEF4MU5jbU5FRW9mUWIvR0I2clRLc2NvVDhXbVdVU1NnRUkifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODIxOTg3MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOcDUifQ==',
    PREFIXE: process.env.PREFIX || "!",
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
    ETAT : process.env.PRESENCE || '',
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

