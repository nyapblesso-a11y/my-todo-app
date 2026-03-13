import pool from "@/lib/db";

export async function GET() {
  const todos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return new Response(JSON.stringify(todos.rows), { status: 200 });
}