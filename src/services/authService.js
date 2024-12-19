import baseUrl from "@/api/instance";

const login = async (formData) => {
  const response = await baseUrl.post("auth/login", formData);

  return response.data;
};

export { login };
