//Configurations for connecting to a Neon database
import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;


//Creates the SQL connection using environment variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
)

// formatted string accept by the neon statement defined in above line - 'postgresql://neondb_owner:npg_4tMKko2ZAmEX@ep-cool-shape-a8q6z9kb-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'



