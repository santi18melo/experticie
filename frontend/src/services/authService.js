// frontend/src/services/authService.js
import api from "./api";

export async function loginService(email, password) {
  console.log("[AUTH] login attempt", email);
  try {
    const resp = await api.post("/auth/login/", { email, password });
    console.log("[AUTH] raw resp", resp.status, resp.data);
    const data = resp.data || {};
    const access = data.access || data.token || data.auth_token || data.tokens?.access;
    const refresh = data.refresh || data.tokens?.refresh;
    const user = data.user || data.usuario || data.data?.user;

    // Always return consistent shape
    return { ok: true, status: resp.status, access, refresh, user, raw: data };
  } catch (err) {
    console.error("[AUTH] login error", err.response?.status, err.response?.data || err.message);
    return { ok: false, error: err.response?.data || err.message };
  }
}

export async function registerService(data) {
  console.log("[AUTH] register attempt", data.email);
  try {
    const resp = await api.post("/auth/register/", data);
    console.log("[AUTH] register resp", resp.status, resp.data);
    return { ok: true, data: resp.data };
  } catch (err) {
    console.error("[AUTH] register error", err.response?.data);
    return { ok: false, error: err.response?.data || err.message };
  }
}

export async function logoutService() {
  console.log("[AUTH] logout");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  return { ok: true };
}

export async function forgotPasswordService(email) {
  console.log("[AUTH] forgot password attempt", email);
  try {
    const resp = await api.post("/auth/forgot-password/", { email });
    return { ok: true, data: resp.data };
  } catch (err) {
    console.error("[AUTH] forgot password error", err.response?.data);
    return { ok: false, error: err.response?.data || err.message };
  }
}

export async function resetPasswordService(uidb64, token, password) {
  console.log("[AUTH] reset password attempt");
  try {
    const resp = await api.post(`/auth/reset-password/${uidb64}/${token}/`, { password });
    return { ok: true, data: resp.data };
  } catch (err) {
    console.error("[AUTH] reset password error", err.response?.data);
    return { ok: false, error: err.response?.data || err.message };
  }
}
