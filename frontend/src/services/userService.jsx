import { api, requestConfig } from "../utils/config";

// Obtenha todas as curvas
const singin = async ( email, password) => {
  const config = requestConfig("GET", {
    email: email,
    password: password
  });

  try {
    const res = await fetch(api + "/signin", config);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Erro na solicitação:", res.status, res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar curvas:", error);
    return null;
  }
};

const userService = {
    singin
}

export default userService;