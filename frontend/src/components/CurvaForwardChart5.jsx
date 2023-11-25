import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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
import { useSelector, useDispatch } from 'react-redux';
import { getCurvaSudesteConv } from '../slices/curvaSlice';

function CurvaForwardChart5({ firstDate, secondDate, thirdDate, submercado, spreadEnergy}) {
  const dispatch = useDispatch();
  const { curvas } = useSelector((state) => state.curva);

  useEffect(() => {
    // dispatch(getCurvaSudesteConv());
  }, [dispatch]);
  if(submercado == "") {
    return <div>Please select...</div>;
  }
  if (!curvas || curvas.length === 0 || spreadEnergy == [] ||spreadEnergy[0] == undefined || spreadEnergy[1] == undefined) {
    return <div>Carregando...</div>;
  }

  //Filter by submercado
  const dadosFiltrados = curvas.filter((curva) => curva.submercado === submercado)
  // Filtrar os dados para as datas desejadas
  const data2019_01_02 = dadosFiltrados.filter((curva) => curva.data === firstDate);
  const data2019_02_01 = dadosFiltrados.filter((curva) => curva.data === secondDate);
  const data2019_03_01 = dadosFiltrados.filter((curva) => curva.data === thirdDate);

  let labels = data2019_01_02.map((curva) => {
    const date = new Date(curva.data_fwd);
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  });
  labels = [...new Set(labels)];

  labels.sort();

  labels.sort((date1, date2) => new Date(date1) - new Date(date2));
  let label_temp = labels.slice(0, 25)

  const result1 = {}, 
  result2 = {},
  result3 = {};
data2019_01_02.forEach((obj) => {
  const { data_fwd } = obj;

  result1[data_fwd] = Math.abs(obj[spreadEnergy[0].value] - obj[spreadEnergy[1].value]);

});

data2019_02_01.forEach((obj) => {
  const { data_fwd } = obj;

  result2[data_fwd] = Math.abs(obj[spreadEnergy[0].value] - obj[spreadEnergy[1].value]);

});

data2019_03_01.forEach((obj) => {
  const { data_fwd  } = obj;
console.log('energy', obj[spreadEnergy[0].value], obj[spreadEnergy[1].value])

    result3[data_fwd] = Math.abs(obj[spreadEnergy[0].value] - obj[spreadEnergy[1].value]);


});


  let precoI502019_01_02
  let precoI502019_02_01
  let precoI502019_03_01
  if(spreadEnergy !== undefined && spreadEnergy[0] !== undefined && spreadEnergy[1] !== undefined){

    precoI502019_01_02 = data2019_01_02.map((curva) => Math.abs(curva[spreadEnergy[0].value], curva[spreadEnergy[1].value]));
    precoI502019_02_01 = data2019_02_01.map((curva) => Math.abs(curva[spreadEnergy[0].value], curva[spreadEnergy[1].value]));
    precoI502019_03_01 = data2019_03_01.map((curva) => Math.abs(curva[spreadEnergy[0].value], curva[spreadEnergy[1].value]));
  
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Curva Forward Incentivada 50% Sudeste',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: false
      },
      {
        label: secondDate,
        data: result2,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointStyle: false
      },
      {
        label: thirdDate,
        data: result3,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        pointStyle: false
      },
    ],
  };
  const getBorderColor =  [
    "rgb(99, 255, 132)",
    "rgb(192, 75, 192)",
    "rgb(206, 255, 86)"
  ];
  // const finalData = [];
  // if(spreadEnergy !== undefined && spreadEnergy[0] !== undefined && spreadEnergy[1] !== undefined){
  //   data.datasets.forEach((data, i) => {

  //       var obj = {
  //         id: data.label,
  //         color: getBorderColor[i],
  //         data: data.data.map((item, index) => {
  //           return {
  //             x: labels[index],
  //             y: item
  //           }
  //         })
    
  //       }
  //       if(data.data.length !== 0)
  //         finalData.push(obj);
  //     })
    
  // }



  return <Line
     options={options} 
      data={data} 
      color='red'
 />
}

export default CurvaForwardChart5;
