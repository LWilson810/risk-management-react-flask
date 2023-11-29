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
import { LineChart } from "@mui/x-charts/LineChart";

function CurvaForwardChart5({
  firstDate,
  secondDate,
  thirdDate,
  submercado,
  spreadEnergy,
}) {
  const dispatch = useDispatch();
  const { curvas } = useSelector((state) => state.curva);
  const { getFetch5 } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());
  }, [dispatch]);
  if (submercado == "") {
    return <div>Please select...</div>;
  }
  if (
    getFetch5.length == 0 ||
    spreadEnergy == [] ||
    submercado == undefined ||
    spreadEnergy[0] == undefined
  ) {
    return <div>Carregando...</div>;
  }

  //Filter by submercado
  // const dadosFiltrados = getFetch5.filter(
  //   (curva) => curva.submercado === submercado
  // );

  const dadosFiltrados = getFetch5;
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
    return curva.data_fwd;
    // const monthNames = [
    //   "Jan",
    //   "Fev",
    //   "Mar",
    //   "Abr",
    //   "Mai",
    //   "Jun",
    //   "Jul",
    //   "Ago",
    //   "Set",
    //   "Out",
    //   "Nov",
    //   "Dez",
    // ];
    // const monthName = monthNames[date.getMonth()];
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();

    // return `${year}-${month}-${day}`;
  });
  labels = [...new Set(labels)];

  labels.sort();

  // labels.sort((date1, date2) => new Date(date1) - new Date(date2));
  // let label_temp = labels.slice(0, 25);

  const result1 = {},
    result2 = {},
    tm_resulted1 = [],
    tm_resulted2 = [],
    tm_resulted3 = [],
    result3 = {};
  data2019_01_02.forEach((obj) => {
    const { data_fwd } = obj;
    tm_resulted1.push(obj[spreadEnergy[0].value]);

    result1[data_fwd] = obj[spreadEnergy[0].value];
  });

  data2019_02_01.forEach((obj) => {
    const { data_fwd } = obj;
    tm_resulted2.push(obj[spreadEnergy[0].value]);

    result2[data_fwd] = obj[spreadEnergy[0].value];
  });

  data2019_03_01.forEach((obj) => {
    const { data_fwd } = obj;
    tm_resulted3.push(obj[spreadEnergy[0].value]);

    result3[data_fwd] = obj[spreadEnergy[0].value];
  });
  console.log("please", spreadEnergy[0], result1, result2, result3);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Curva Forward Incentivada 50% Sudeste",
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  //   tooltips: {
  //     enabled: true,
  //   },
  // };

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: firstDate,
  //       data: result1,
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       pointStyle: false,
  //     },
  //     {
  //       label: secondDate,
  //       data: result2,
  //       borderColor: "rgb(75, 192, 192)",
  //       backgroundColor: "rgba(75, 192, 192, 0.5)",
  //       pointStyle: false,
  //     },
  //     {
  //       label: thirdDate,
  //       data: result3,
  //       borderColor: "rgb(255, 206, 86)",
  //       backgroundColor: "rgba(255, 206, 86, 0.5)",
  //       pointStyle: false,
  //     },
  //   ],
  // };
  // const getBorderColor = [
  //   "rgb(99, 255, 132)",
  //   "rgb(192, 75, 192)",
  //   "rgb(206, 255, 86)",
  // ];
  return (
    <LineChart
      width={650}
      height={300}
      series={[
        { data: tm_resulted1, label: firstDate, color: "#ed7d31" },
        { data: tm_resulted2, label: secondDate, color: "#a5a5a5" },
        { data: tm_resulted3, label: thirdDate, color: "#4472c4" },
      ]}
      xAxis={[{ scaleType: "point", data: labels }]}
    />
  );
}

export default CurvaForwardChart5;
