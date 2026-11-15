import api from "./api";
export const studentService = {
  async getAll(params = {}) {
    const { data } = await api.get("/students", { params });
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/students/${id}`);
    return data;
  },
  async create(payload) {
    const { data } = await api.post("/students", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/students/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },
};
