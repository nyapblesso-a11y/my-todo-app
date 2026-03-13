import pool from "@/lib/db";

export async function GET() {
  const todos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return new Response(JSON.stringify(todos.rows), { status: 200 });
}


export async function POST(req) {
  const { title, user_id } = await req.json();
  const newTodo = await pool.query(
    "INSERT INTO todos(title, user_id) VALUES($1, $2) RETURNING *",
    [title, user_id]
  );
  return new Response(JSON.stringify(newTodo.rows[0]), { status: 201 });
}

export async function PUT(req) {
  const { id, completed } = await req.json();
  const updatedTodo = await pool.query(
    "UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *",
    [completed, id]
  );
  return new Response(JSON.stringify(updatedTodo.rows[0]), { status: 200 });
}

export async function DELETE(req) {
  const { deleteId } = await req.json();
  await pool.query("DELETE FROM todos WHERE id=$1", [deleteId]);
  const remainingTodos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return new Response(JSON.stringify(remainingTodos.rows), { status: 200 });
}