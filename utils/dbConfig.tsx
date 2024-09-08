import { neon } from "@neondatabase/serverless";

import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(
    process.env.NEXT_PUBLIC_DATABASE_URL ?? 'postgresql://finacledb_owner:BQu2cNgv4tCH@ep-hidden-base-a58wno7u.us-east-2.aws.neon.tech/finacledb?sslmode=require'
)


export const db = drizzle(sql, { schema })