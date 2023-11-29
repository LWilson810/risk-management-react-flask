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
  console.log("fefe", opera);
  if (opera.error == "Dados não encontrados") {
    return <div>Nothing...</div>;
  }
  const dadosFiltrados = opera.filter(
    (item) => new Date(item.createdAt) < new Date(firstDate)
  );
  let finalData;
  if (submercado == "ALL") {
    finalData = opera;
  } else {
    finalData = opera.filter((item) => item.energySource == submercado);
  }
  let labels = opera.map((curva) => {
    return curva.data_fwd;
  });

  labels = [...new Set(labels)];
  labels.sort();
  const result = [];
  let result1 = {};

  labels.map((label) => {
    let value = 0;
    finalData.map((index) => {
      if (index.data_fwd == label) {
        value += parseFloat(index.Net);
      }
    });
    console.log("result", label, value);

    result1[label] = value;
    result.push({ name: label, value: value });
  });

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
