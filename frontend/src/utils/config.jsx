// export const api = "http://52.14.149.102:5000/api";
export const api = "http://127.0.0.1:3001/api";

export const requestConfig = (method, data, token = null) => {
  let config;

  if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
