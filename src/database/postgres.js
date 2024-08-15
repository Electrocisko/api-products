import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    url: process.env.DATABASE_URL
})
