import apiClient from "./client";

export async function lookupIp(ip) {
  const res = await apiClient.post("/ip-lookup", { ip });
  return res.data.record;
}

export async function getLogs(filters = {}) {
  const res = await apiClient.get("/ip-logs", { params: filters });
  return res.data.records || res.data;
}

export async function deleteLog(id) {
  await apiClient.delete(`/ip-logs/${id}`);
}

export async function clearLogs() {
  await apiClient.delete("/ip-logs");
}
