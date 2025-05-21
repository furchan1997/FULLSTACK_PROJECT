import httpService from "./httpService";

export async function loginLoger() {
  const response = await httpService.get("/admin-loger/login-log");
  return response.data;
}

const logerService = {
  loginLoger,
};

export default logerService;
