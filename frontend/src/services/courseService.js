import api from "./api";
export const courseService = {
  async getAll(params = {}) {
    const { data } = await api.get("/courses", { params });
    return data;
  },
  async create(payload) {
    const { data } = await api.post("/courses", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await api.put(`/courses/${id}`, payload);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/courses/${id}`);
    return data;
  },
};
