import { api, requestConfig } from "../utils/config";

const getOpera = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/opera/getitems", config);
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

// Obtenha todas as curvas
const getCurvas = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas", config);
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
const getCurvaSubmarket = async (param) => {
  // get S
  const config = requestConfig("GET", null);
  const parts = param.split("+");
  console.log("geegeg", parts[0]);
  try {
    const res = await fetch(
      api + `/curvas/getfetch6?param1=${parts[0]}&param2=${parts[1]}`,
      config
    )
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getCurvaSudesteConv = async () => {
  // get S
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas/sudeste", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};
const getCurvaSudeste1Conv = async () => {
  //get SE
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas/sudeste1", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getCurvaNordesteConv = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas/nordeste", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getCurvaNorteConv = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas/norte", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getDatafwdCurva = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/curvas/data_fwd", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getDataFromSubmarket = async (param) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(
      api +
        `/curvas/getfetch?param1=${param[0].value}&param2=${param[1].value}`,
      config
    )
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const curvaService = {
  getOpera,
  getCurvas,
  getCurvaSudesteConv,
  getCurvaSudeste1Conv,
  getCurvaNordesteConv,
  getCurvaNorteConv,
  getDatafwdCurva,
  getDataFromSubmarket,
  getCurvaSubmarket,
};

export default curvaService;
