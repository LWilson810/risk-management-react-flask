import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ResponsiveLine } from "@nivo/line";
import { useSelector, useDispatch } from 'react-redux';
import { getCurvaSudesteConv, getCurvaSudeste1Conv, getCurvaNordesteConv, getCurvaNorteConv } from '../slices/curvaSlice';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

function CurvaForwardChart({ selectedSubmercado, firstDate, secondDate, thirdDate, submercado }) {
  const dispatch = useDispatch();
  const { curvas } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvas());

  }, [dispatch]);

  if (!curvas || curvas.length === 0) {
    return <div>Carregando...</div>;
  }

  const datasDesejadas = [firstDate, secondDate, thirdDate];
  console.log('I want to know',curvas)

  // Filtrar os dados para incluir apenas as datas desejadas
  var dadosFiltrados = curvas.filter((curva) => datasDesejadas.includes(curva.data));

  //Filter by submercado
  dadosFiltrados = dadosFiltrados.filter((curva) => curva.submercado === submercado)

  // Ordenar os dados por data_fwd
  dadosFiltrados.sort((a, b) => new Date(a.data_fwd) - new Date(b.data_fwd));

  // Criar um objeto para armazenar os preços por data_fwd
  const precoPorData = {};

  // Preencher o objeto com os preços
  datasDesejadas.forEach((data) => {
    precoPorData[data] = dadosFiltrados
      .filter((curva) => curva.data === data)
      .map((curva) => curva.preco_conv);
  });

  // Criar um array de labels contendo apenas os meses desejados para todos os anos
  const mesesDesejados = ['01', '04', '08', '12'];
  const labels = [];

  dadosFiltrados.forEach((curva) => {
    const mesAtual = curva.data_fwd.substring(5, 7);
    if (mesesDesejados.includes(mesAtual) && !labels.includes(curva.data_fwd)) {
      labels.push(curva.data_fwd);
    }
  });

  // Função para obter a cor de borda com base no índice
  const getBorderColor = (index) => {
    const borderColorOptions = [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 206, 86)',
      // Adicione mais cores conforme necessário
    ];
    return borderColorOptions[index % borderColorOptions.length];
  };
  
  // Função para obter a cor de fundo com base no índice
  const getBackgroundColor = (index) => {
    const backgroundColorOptions = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      // Adicione mais cores conforme necessário
    ];
    return backgroundColorOptions[index % backgroundColorOptions.length];
  };


  const datasets = datasDesejadas.map((data, index) => ({
    label: data,
    data: precoPorData[data],
    borderColor: getBorderColor(index),
    backgroundColor: getBackgroundColor(index),
    pointStyle: false
  }));

  const finalData = [];
  datasets.forEach((data, i) => {
    var obj = {
      id: data.label,
      color: getBorderColor(i),
      data: data.data.map((item, index) => {
        return {
          x: labels[index],
          y: item
        }
      })

    }
    if(data.data.length !== 0)
      finalData.push(obj);
  })


  console.log(finalData)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Curva Forward Convencional ${submercado}`,
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: labels,
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
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className='h-[250px]' style={{backgroundColor: 'white'}}>
      <Line
       options={options} 
      data={data} 
      color='red'
      />
      {/* <ResponsiveLine
      options={options}
      data={finalData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#e0e0e0",
            },
          },
          legend: {
            text: {
              fill: "#e0e0e0",
            },
          },
          ticks: {
            line: {
              stroke: "#e0e0e0",
              strokeWidth: 1,
            },
            text: {
              fill: "#e0e0e0",
            },
          },
        },
        legends: {
          text: {
            fill: "#e0e0e0",
          },
        },
        tooltip: {
          container: {
            color: "#141b2d",
          },
        },
      }}
      colors={{ datum: "color" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: -45,
        // legend: "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      title={`Curva Forward Convencional ${submercado}`}
    /> */}
    </div>
  );
}

export default CurvaForwardChart;
