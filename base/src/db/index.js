import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';
import postgres from 'postgres';


const client=postgres(process.env.CONNECTION_STRING)
export const db= drizzle(client,{schema});