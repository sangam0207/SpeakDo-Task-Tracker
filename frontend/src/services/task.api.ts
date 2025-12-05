import api from "@/services";

export const apiCreateTask = async (payload: {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}) => {
  return await api.post("/task/create", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiGetTasks = async () => {
  return await api.get("/task/get");
};

export const apiGetGroupedTasks = async () => {
  return await api.get("/task/grouped");
};


export const apiGetSingleTask = async (id: string) => {
  return await api.get(`/task/get/${id}`);
};


export const apiUpdateTask = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }
) => {
  return await api.patch(`/task/update/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiDeleteTask = async (id: string) => {
  return await api.delete(`/task/delete/${id}`);
};
