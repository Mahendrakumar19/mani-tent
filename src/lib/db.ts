import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'mani_tent_house',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: '+00:00'
    });
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  try {
    const p = getDbPool();
    const [rows] = await p.execute(sql, params);
    return rows as T;
  } catch (error: any) {
    console.error('Database Query Error:', error.message);
    throw error;
  }
}
