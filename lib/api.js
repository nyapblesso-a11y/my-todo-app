export async function getTodos() {
  try {
    const res = await fetch(`${window.location.origin}/api/todos`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  } catch (err) {
    console.error("Error fetching todos:", err);
    return [];
  }
}

// Add a new todo
export async function addTodo(title, user_id) {
  const res = await fetch(`${window.location.origin}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, user_id }),
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

// Toggle todo completion
export async function toggleTodo(id, completed) {
  const res = await fetch("/api/todos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, completed: !completed }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

// Delete a todo
export async function deleteTodo(id) {
  const res = await fetch("/api/todos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deleteId: id }),
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}
