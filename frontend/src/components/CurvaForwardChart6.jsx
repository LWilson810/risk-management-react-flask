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

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());
  }, [dispatch]);

  if (
    !subFilterValues ||
    subFilterValues.length === 0 ||
    sourcemercado == undefined
  ) {
    return <div>Carregando...</div>;
  }

  //Filter by submercado
  //   const dadosFiltrados = subFilterValues.filter((subFilterValue) => subFilterValue.submercado === sourcemercado)
  const dadosFiltrados = subFilterValues;
  // Filtrar os dados para as datas desejadas
  console.log("dadosFiltrados", dadosFiltrados);
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
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  });
  let precoI502019_01_02;
  let precoI502019_02_01;
  let precoI502019_03_01;
  console.log("result1", labels);

  labels = [...new Set(labels)];
  console.log("result2", labels);

  labels.sort();
  console.log("result3", labels);

  labels.sort((date1, date2) => new Date(date1) - new Date(date2));
  let label_temp = labels.slice(0, 25)

  console.log("result4", labels);

  const result1 = {},
    result2 = {},
    result3 = {};

  data2019_01_02.forEach((obj) => {
    const { data_fwd, preco_conv, submercado } = obj;

    // Check if the data_fwd exists in the result object
    if (!result1[data_fwd]) {
      // If not, initialize it with an empty object
      result1[data_fwd] = 0;
    }

    // Check if the submercado exists in the result object for the specific data_fwd
    if (!result1[data_fwd]) {
      // If not, initialize it with the current preco_conv value
      result1[data_fwd] = obj[sourcemercado];
    } else {
      // If it already exists, calculate the difference and store it as preco_conv
      result1[data_fwd] -= obj[sourcemercado];
    }
  });

  data2019_02_01.forEach((obj) => {
    const { data_fwd, preco_conv, submercado } = obj;

    // Check if the data_fwd exists in the result object
    if (!result2[data_fwd]) {
      // If not, initialize it with an empty object
      result2[data_fwd] = 0;
    }

    // Check if the submercado exists in the result object for the specific data_fwd
    if (!result2[data_fwd]) {
      // If not, initialize it with the current preco_conv value
      result2[data_fwd] = obj[sourcemercado];
    } else {
      // If it already exists, calculate the difference and store it as preco_conv
      result2[data_fwd] -= obj[sourcemercado];
    }
  });

  data2019_03_01.forEach((obj) => {
    const { data_fwd, preco_conv, submercado } = obj;

    // Check if the data_fwd exists in the result object
    if (!result3[data_fwd]) {
      // If not, initialize it with an empty object
      result3[data_fwd] = 0;
    }

    // Check if the submercado exists in the result object for the specific data_fwd
    if (!result3[data_fwd]) {
      // If not, initialize it with the current preco_conv value
      result3[data_fwd] = obj[sourcemercado];
    } else {
      // If it already exists, calculate the difference and store it as preco_conv
      result3[data_fwd] -= obj[sourcemercado];
    }
  });
  if (
    spreadSubmarket !== undefined &&
    spreadSubmarket[0] !== undefined &&
    spreadSubmarket[1] !== undefined
  ) {
    precoI502019_01_02 = data2019_01_02.map((curva) =>
      Math.abs(curva[spreadSubmarket[0].value], curva[spreadSubmarket[1].value])
    );
    precoI502019_02_01 = data2019_02_01.map((curva) =>
      Math.abs(curva[spreadSubmarket[0].value], curva[spreadSubmarket[1].value])
    );
    precoI502019_03_01 = data2019_03_01.map((curva) =>
      Math.abs(curva[spreadSubmarket[0].value], curva[spreadSubmarket[1].value])
    );
  }

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
    label_temp,
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
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        pointStyle: false,
      },
    ],
  };
  const getBorderColor = [
    "rgb(99, 255, 132)",
    "rgb(192, 75, 192)",
    "rgb(206, 255, 86)",
  ];
  const finalData = [];
  if (
    spreadSubmarket !== undefined &&
    spreadSubmarket[0] !== undefined &&
    spreadSubmarket[1] !== undefined
  ) {
    // data.datasets.forEach((data, i) => {
    //     var obj = {
    //       id: data.label,
    //       color: getBorderColor[i],
    //       data: data.data.map((item, index) => {
    //         return {
    //           x: labels[index],
    //           y: item
    //         }
    //       })
    //     }
    //     if(data.data.length !== 0)
    //       finalData.push(obj);
    //   })
  }

  return <Line options={options} data={data} color="red" />;
}

export default CurvaForwardChart6;
