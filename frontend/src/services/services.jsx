const BASE_URL = "http://localhost:3000";

// export const fetchTasks = async () => {
//   try {
//     const tasks = await prisma.task.findMany();
//     return tasks;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error;
//   }
// };

export const createTask = async (text) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  return await response.json();
};

// export const fetchTaskById = async (id) => {
//   const response = await fetch(`${BASE_URL}/task/${id}`);
//   return await response.json();
// };

// export const updateTask = async (id, text) => {
//   const response = await fetch(`${BASE_URL}/task/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ text }),
//   });
//   return await response.json();
// };

// export const deleteTask = async (taskId) => {
//   const response = await fetch(`${BASE_URL}/task/${taskId}`, {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete the task");
//   }

//   return await response.json();
// };
