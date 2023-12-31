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
import { ResponsiveLine } from "@nivo/line";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurvaSudesteConv,
  getCurvaSudeste1Conv,
  getCurvaNordesteConv,
  getCurvaNorteConv,
} from "../slices/curvaSlice";
import { LineChart } from "@mui/x-charts/LineChart";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

function CurvaForwardChart({
  selectedSubmercado,
  firstDate,
  secondDate,
  thirdDate,
  submercado,
}) {
  const dispatch = useDispatch();
  const { curvas } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());
  }, [dispatch]);
  if (submercado == "") {
    return <div>Please select...</div>;
  }
  if (!curvas || curvas.length === 0) {
    return <div>Carregando...</div>;
  }
  //Filter by submercado
  const dadosFiltrados = curvas;
  console.log("label", dadosFiltrados);

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

    // const monthNames = [
    //   'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    //   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    // ];
    // const monthName = monthNames[date.getMonth()];
    // console.log('getfullyear', date)
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();

    return curva.data_fwd;
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
    const { data_fwd, preco, conv } = obj;
    // result1[data_fwd] = preco_conv;
    tm_resulted1.push(preco + conv);
    result1[data_fwd] = preco + conv;
    // Check if the submercado exists in the result object for the specific data_fwd
  });

  data2019_02_01.forEach((obj) => {
    const { data_fwd, preco, conv } = obj;
    tm_resulted2.push(preco + conv);
    // result2[data_fwd] = preco_conv;
    result2[data_fwd] = preco + conv;
    // Check if the submercado exists in the result object for the specific data_fwd
  });
  data2019_03_01.forEach((obj) => {
    const { data_fwd, preco, conv } = obj;
    tm_resulted3.push(preco + conv);
    // result1[data_fwd] = preco_conv;
    result3[data_fwd] = preco + conv;
    // Check if the submercado exists in the result object for the specific data_fwd
  });

  // const precoI02019_01_02 = data2019_01_02.map((curva) => curva.preco_conv);
  // const precoI02019_02_01 = data2019_02_01.map((curva) => curva.preco_conv);
  // const precoI02019_03_01 = data2019_03_01.map((curva) => curva.preco_conv);
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Curva Forward Incentivada 0% Sudeste",
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
  //   label_temp,
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
  //   "rgb(255, 99, 132)",
  //   "rgb(75, 192, 192)",
  //   "rgb(255, 206, 86)",
  // ];
  // const finalData = [];
  // data.datasets.forEach((data, i) => {
  //   var obj = {
  //     id: data.label,
  //     color: getBorderColor[i],
  //     data: data.data.map((item, index) => {
  //       return {
  //         x: labels[index],
  //         y: item
  //       }
  //     })

  //   }
  //   if(data.data.length !== 0)
  //     finalData.push(obj);
  // })

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
  // <Line options={options} data={data} color="red" />;
  //   <ResponsiveLine
  //   data={finalData}
  //   theme={{
  //     axis: {
  //       domain: {
  //         line: {
  //           stroke: "#e0e0e0",
  //         },
  //       },
  //       legend: {
  //         text: {
  //           fill: "#e0e0e0",
  //         },
  //       },
  //       ticks: {
  //         line: {
  //           stroke: "#e0e0e0",
  //           strokeWidth: 1,
  //         },
  //         text: {
  //           fill: "#e0e0e0",
  //         },
  //       },
  //     },
  //     legends: {
  //       text: {
  //         fill: "#e0e0e0",
  //       },
  //     },
  //     tooltip: {
  //       container: {
  //         color: "#141b2d",
  //       },
  //     },
  //   }}
  //   colors={{ datum: "color" }} // added
  //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  //   xScale={{ type: "point" }}
  //   yScale={{
  //     type: "linear",
  //     min: "auto",
  //     max: "auto",
  //     stacked: true,
  //     reverse: false,
  //   }}
  //   yFormat=" >-.2f"
  //   curve="catmullRom"
  //   axisTop={null}
  //   axisRight={null}
  //   axisBottom={{
  //     orient: "bottom",
  //     tickSize: 0,
  //     tickPadding: 5,
  //     tickRotation: -45,
  //     // legend: "transportation", // added
  //     legendOffset: 36,
  //     legendPosition: "middle",
  //   }}
  //   axisLeft={{
  //     orient: "left",
  //     tickValues: 5, // added
  //     tickSize: 3,
  //     tickPadding: 5,
  //     tickRotation: 0,
  //     legend: "count", // added
  //     legendOffset: -40,
  //     legendPosition: "middle",
  //   }}
  //   enableGridX={false}
  //   enableGridY={false}
  //   pointSize={8}
  //   pointColor={{ theme: "background" }}
  //   pointBorderWidth={2}
  //   pointBorderColor={{ from: "serieColor" }}
  //   pointLabelYOffset={-12}
  //   useMesh={true}
  //   legends={[
  //     {
  //       anchor: "bottom-right",
  //       direction: "column",
  //       justify: false,
  //       translateX: 100,
  //       translateY: 0,
  //       itemsSpacing: 0,
  //       itemDirection: "left-to-right",
  //       itemWidth: 80,
  //       itemHeight: 20,
  //       itemOpacity: 0.75,
  //       symbolSize: 12,
  //       symbolShape: "circle",
  //       symbolBorderColor: "rgba(0, 0, 0, .5)",
  //       effects: [
  //         {
  //           on: "hover",
  //           style: {
  //             itemBackground: "rgba(0, 0, 0, .03)",
  //             itemOpacity: 1,
  //           },
  //         },
  //       ],
  //     },
  //   ]}
  // />;
}

export default CurvaForwardChart;
