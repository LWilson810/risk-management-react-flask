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
import { ResponsiveLine } from "@nivo/line";
// import { BarChart,  XAxis, YAxis, CartesianGrid } from "recharts";
import { Bar } from "react-chartjs-2";

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

function PortfolioChart1({ firstDate, submercado }) {
  let { opera } = useSelector((state) => state.curva);

  const dadosFiltrados = opera.filter(
    (item) => new Date(item.createdAt) < new Date(firstDate)
  );
  let finalData;
  if (submercado == "ALL") {
    finalData = dadosFiltrados;
  } else {
    finalData = dadosFiltrados.filter(
      (item) => item.energySource == submercado
    );
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Engergy Source",
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

export default PortfolioChart1;
