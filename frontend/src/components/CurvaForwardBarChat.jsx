import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getCurvaSudesteConv } from '../slices/curvaSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CurvaForwardBarChat({ selectedSubmercado, firstDate, secondDate, thirdDate, submercado }) {
  const dispatch = useDispatch();
  const { curvas } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());

  }, [dispatch]);

  if (!curvas || curvas.length === 0) {
    return <div>Carregando...</div>;
  }

  const datasDesejadas = [firstDate, secondDate, thirdDate];
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
      'rgba(255, 99, 132)',
      'rgba(75, 192, 192)',
      'rgba(255, 206, 86)',
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
          color:'rgba(255,255,255,0.2)'
        },
        ticks: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      y: {
        grid: {
          display: false, 
          color:'rgba(255,255,255,0.2)'
        },
        ticks: {
          color: 'rgba(255,255,255,0.2)'
        }
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
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default CurvaForwardBarChat;
