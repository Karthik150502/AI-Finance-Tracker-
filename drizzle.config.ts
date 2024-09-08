
export default {
    dialect: 'postgresql',
    schema: './utils/schema.tsx',
    out: './drizzle',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL || "postgresql://finacledb_owner:BQu2cNgv4tCH@ep-hidden-base-a58wno7u.us-east-2.aws.neon.tech/finacledb?sslmode=require",
        connectionStrings: process.env.NEXT_PUBLIC_DATABASE_URL || "postgresql://finacledb_owner:BQu2cNgv4tCH@ep-hidden-base-a58wno7u.us-east-2.aws.neon.tech/finacledb?sslmode=require"
    }
}


