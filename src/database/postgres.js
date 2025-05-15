import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    ssl: {
        rejectUnauthorized: false
    }
})

// export const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_PUBLIC_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });