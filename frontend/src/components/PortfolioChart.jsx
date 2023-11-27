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
import { Bar } from "react-chartjs-2";
import { ResponsiveLine } from "@nivo/line";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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

function PortfolioChart({ firstDate, submercado }) {
  const dispatch = useDispatch();
  let { curvas } = useSelector((state) => state.curva);
  let { opera } = useSelector((state) => state.curva);

  const dadosFiltrados = opera.filter(
    (item) => new Date(item.createdAt) < new Date(firstDate)
  );
  let finalData;
  if (submercado == "ALL") {
    finalData = dadosFiltrados;
  } else {
    finalData = dadosFiltrados.filter((item) => item.Submarket == submercado);
  }
  console.log("finalData", finalData);
  let labels = opera.map((curva) => {
    const date = new Date(curva.supplyDate);
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
  const result = [];
  let result1 = {};
  labels.map((label) => {
    let value = 0;
    finalData.map((index) => {
      if (index.operationType == "Compra" && index.supplyDate == label) {
        value += parseFloat(index.finalVolumeMwm);
      } else if (index.operationType == "Venda" && index.supplyDate == label) {
        value -= parseFloat(index.finalVolumeMwm);
      }
    });
    result1[label] = value;
    result.push({ name: label, value: value });
  });
  console.log("result", result1);
  // labels.sort();

  // labels.sort((date1, date2) => new Date(date1) - new Date(date2));
  // let label_temp = labels.slice(0, 25);
  // console.log("labels", label_temp);

  // data2019_01_02.forEach((obj) => {
  //   const { data_fwd, preco, i50 } = obj;
  //   result1[data_fwd] = preco + i50;
  //   // Check if the submercado exists in the result object for the specific data_fwd
  // });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Submarket",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: result1,
        backgroundColor: labels.map((label) =>
          result1[label] > 0
            ? "rgba(54, 162, 235, 0.5)"
            : "rgba(255, 99, 132, 0.5)"
        ),
      },
    ],
  };

  return (
    <div
      className="justify-center"
      style={{
        height: "27vw",
        width: "800px",
        position: "sticky",
        top: "20px",
      }}
    >
      <Bar options={options} data={data} style={{ width: "100%" }} />
    </div>
  );
}

export default PortfolioChart;
