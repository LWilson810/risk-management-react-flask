import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { ResponsiveLine } from '@nivo/line';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useSelector, useDispatch } from "react-redux";
import { getCurvaSudesteConv } from "../slices/curvaSlice";

function CurvaForwardChart6({
  selectedSourcecado,
  firstDate,
  secondDate,
  thirdDate,
  sourcemercado,
  spreadSubmarket,
}) {
  const dispatch = useDispatch();
  const { subFilterValues } = useSelector((state) => state.curva);
  const { curvaSubmarket } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());
  }, [dispatch]);

  if (sourcemercado == "") {
    return <div>Please select...</div>;
  }
  if (
    curvaSubmarket.length === 0 ||
    sourcemercado == undefined ||
    spreadSubmarket[0] == undefined
  ) {
    return <div>Carregando...</div>;
  }

  //Filter by submercado
  //   const dadosFiltrados = subFilterValues.filter((subFilterValue) => subFilterValue.submercado === sourcemercado)
  const dadosFiltrados = curvaSubmarket;
  // Filtrar os dados para as datas desejadas
  const data2019_01_02 = dadosFiltrados.filter(
    (curva) => curva.data === firstDate
  );
  const data2019_02_01 = dadosFiltrados.filter(
    (curva) => curva.data === secondDate
  );
  const data2019_03_01 = dadosFiltrados.filter(
    (curva) => curva.data === thirdDate
  );

  let labels = data2019_01_02.map((curva) => {
    const date = new Date(curva.data_fwd);
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  });

  labels = [...new Set(labels)];

  labels.sort();

  const result1 = {},
    result2 = {},
    result3 = {};
  data2019_01_02.filter((obj) => {
    result1[obj.data_fwd] = obj[spreadSubmarket[0].value];
  });

  data2019_02_01.filter((obj) => {
    result2[obj.data_fwd] = obj[spreadSubmarket[0].value];
  });

  data2019_03_01.filter((obj) => {
    result3[obj.data_fwd] = obj[spreadSubmarket[0].value];
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Curva Forward Incentivada 50% Sudeste",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    tooltips: {
      enabled: true,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: firstDate,
        data: result1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: false,
      },
      {
        label: secondDate,
        data: result2,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        pointStyle: false,
      },
      {
        label: thirdDate,
        data: result3,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86)",
        pointStyle: false,
      },
    ],
  };

  return <Line options={options} data={data} color="red" />;
}

export default CurvaForwardChart6;
