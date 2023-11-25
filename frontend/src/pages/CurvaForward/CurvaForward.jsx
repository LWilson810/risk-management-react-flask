import React, { useState, useEffect } from "react";
import { DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CurvaForwardChart from "../../components/CurvaForwardChart";
import CurvaForwardChart2 from "../../components/CurvaForwardChart2";
import CurvaForwardChart3 from "../../components/CurvaForwardChart3";
import CurvaForwardChart4 from "../../components/CurvaForwardChart4";
import CurvaForwardChart5 from "../../components/CurvaForwardChart5";
import CurvaForwardChart6 from "../../components/CurvaForwardChart6";

import { useDispatch } from "react-redux";
import {
  getCurvaSudesteConv,
  getCurvaSudeste1Conv,
  getCurvaNordesteConv,
  getCurvaNorteConv,
  getDataFromSubmarket
} from "../../slices/curvaSlice";
import { TreeSelect, Select } from "antd";
const { SHOW_PARENT } = TreeSelect;

const CurvaForward = () => {
  const date = new Date().toISOString();
  const dispatch = useDispatch();

  const [selectedSubmercado, setSelectedSubmercado] = useState("SE");
  const [selectedSubmercadoUnder, setSelectedSubmercadoUnder] = useState("SE");
  const [selectedSourcemercado, setSelectedSourcemercado] = useState();
  
  selectedSourcemercado
  const [firstDate, setFirstDate] = useState("2019-01-02");
  const [secondDate, setSecondDate] = useState("2019-02-01");
  const [thirdDate, setThirdDate] = useState("2019-03-01");
  const [firstDateUnder, setFirstDateUnder] = useState("2019-01-02");
  const [secondDateUnder, setSecondDateUnder] = useState("2019-02-01");
  const [thirdDateUnder, setThirdDateUnder] = useState("2019-03-01");
  const [value, setValue] = useState([]);
  const [Subvalue, setSubValue] = useState([]);

  const user_info = useSelector((state) => state.user);
  const navigator = useNavigate();
  useEffect(() => {
    if (!user_info.loggedIn) navigator("/sign-in");
  }, [user_info]);



  const onSpreadSubmarket = (newValue) => {
    console.log("onChange ", newValue);
    if (newValue.length <= 2) {
      setValue(newValue);
    }
  };
  const onSpreadSubmarket1 = (newValue) => {
    console.log("onChange ", newValue);
    if (newValue.length <= 2) {
      setSubValue(newValue);
    }
    if(newValue.length == 2){
      console.log('all submarket', newValue)
      dispatch(getDataFromSubmarket(newValue));
      
    }
  };
  const handleEnergy = (newValue) => {
    console.log("onChange ", newValue);
    console.log("e.tar", newValue);
    switch (newValue) {
      case "S":
        dispatch(getCurvaSudesteConv());
        break;
      case "SE":
        dispatch(getCurvaSudeste1Conv());
        break;
      case "NE":
        dispatch(getCurvaNordesteConv());
        break;

      case "N":
        dispatch(getCurvaNorteConv());
        break;

      default:
        break;
    }

    setSelectedSubmercadoUnder(newValue);
  };

  const handleEnergy1 = (newValue) => {
    console.log("onChange ", newValue);
    console.log("e.tar", newValue);
    

    setSelectedSourcemercado(newValue);
  };

  const handleSubmercadoChange = (e) => {
    console.log("e.tar", e.target.value);
    switch (e.target.value) {
      case "S":
        dispatch(getCurvaSudesteConv());
        break;
      case "SE":
        dispatch(getCurvaSudeste1Conv());
        break;
      case "NE":
        dispatch(getCurvaNordesteConv());
        break;

      case "N":
        dispatch(getCurvaNorteConv());
        break;

      default:
        break;
    }

    setSelectedSubmercado(e.target.value);
  };



  const handleFirstDateChange = (e) => {
    setFirstDate(e.target.value);
  };
  const handleSecondDateChange = (e) => {
    setSecondDate(e.target.value);
  };

  const handleThirdDateChange = (e) => {
    setThirdDate(e.target.value);
  };

  const handleFirstDateChangeUnder = (e) => {
    setFirstDateUnder(e.target.value);
  };
  const handleSecondDateChangeUnder = (e) => {
    setSecondDateUnder(e.target.value);
  };

  const handleThirdDateChangeUnder = (e) => {
    setThirdDateUnder(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const treeData = [
    {
      title: "conv",
      value: "conv",
      key: "0-0",
    },
    {
      title: "i0",
      value: "i0",
      key: "0-1",
    },
    {
      title: "i50",
      value: "i50",
      key: "0-2",
    },

    {
      title: "i100",
      value: "i100",
      key: "0-3",
    },
    {
      title: "preco_conv",
      value: "preco_conv",
      key: "0-4",
    },
    {
      title: "preco_i0",
      value: "preco_i0",
      key: "0-5",
    },
    {
      title: "preco_i50",
      value: "preco_i50",
      key: "0-6",
    },
    {
      title: "preco_i100",
      value: "preco_i100",
      key: "0-7",
    },
  ];

  const subTree = [
    {
      title: "Sudeste",
      value: "SE",
      key: "1-0",
    },
    {
      title: "Sul",
      value: "S",
      key: "1-1",
    },
    {
      title: "Nordeste",
      value: "NE",
      key: "1-2",
    },

    {
      title: "Norte",
      value: "N",
      key: "1-3",
    },
  ];


  
  const tProps = {
    treeData,
    value,
    onChange: onSpreadSubmarket,
    treeCheckable: true,
    treeCheckStrictly: true,
    maxTagCount: 2,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  const tProps1 = {
    treeData: subTree,
    value: Subvalue,
    onChange: onSpreadSubmarket1,
    treeCheckable: true,
    treeCheckStrictly: true,
    maxTagCount: 2,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-12 gap-1">
        <h1 className="text-white col-span-full text-3xl font-bold">
          Curva Forward
        </h1>
        {/* <h4 className="text-[#70d8bd] col-span-full">Welcome to your Dashboard</h4> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly p-5 mt-5 ml-5 mr-5 rounded-lg bg-[#1f2a40]">
          <div className="w-50 mt-2 p-2">
            <h2 className="text-white">Escolha o Submercado:</h2> 

            <select
              className="h-7 border-none rounded-md"
              value={selectedSubmercado}
              onChange={handleSubmercadoChange}
            >
              <option value="SE">Sudeste</option>
              <option value="S">Sul</option>
              <option value="NE">Nordeste</option>
              <option value="N">Norte</option>
            </select>
          </div>
          <div className="w-50 mt-2 p-2">
            <h2 className="text-white">Insira as datas desejadas</h2>

            <input
              type="date"
              placeholder="Data inicial"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={firstDate}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleFirstDateChange}
            />
            <input
              type="date"
              placeholder="Data final"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={secondDate}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleSecondDateChange}
            />
            <input
              type="date"
              placeholder="Data final"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={thirdDate}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleThirdDateChange}
            />
            {/* <button type="submit">Atualizar Gráfico</button> */}
          </div>
        </div>
      </form>
      <div className="grid grid-rows-2 w-full p-5 gap-5 h-screen">
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart
              selectedSubmercado={selectedSubmercado}
              firstDate={firstDate}
              secondDate={secondDate}
              thirdDate={thirdDate}
              submercado={selectedSubmercado}
            />
          </div>
          <div className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart2
              selectedSubmercado={selectedSubmercado}
              firstDate={firstDate}
              secondDate={secondDate}
              thirdDate={thirdDate}
              submercado={selectedSubmercado}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart3
              selectedSubmercado={selectedSubmercado}
              firstDate={firstDate}
              secondDate={secondDate}
              thirdDate={thirdDate}
              submercado={selectedSubmercado}
            />
          </div>
          <div className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart4
              selectedSubmercado={selectedSubmercado}
              firstDate={firstDate}
              secondDate={secondDate}
              thirdDate={thirdDate}
              submercado={selectedSubmercado}
            />
          </div>
        </div>
      </div>

      <form>
        <div className="justify-evenly p-5 mt-5 ml-5 mr-5 rounded-lg bg-[#1f2a40]">
          <div className="w-50 mt-2 p-2">
            <h2 className="text-white">Insira as datas desejadas</h2>

            <input
              type="date"
              placeholder="Data inicial"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={firstDateUnder}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleFirstDateChangeUnder}
            />
            <input
              type="date"
              placeholder="Data final"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={secondDateUnder}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleSecondDateChangeUnder}
            />
            <input
              type="date"
              placeholder="Data final"
              className="w-21 mr-2 border-2 border-black rounded-md"
              value={thirdDateUnder}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={handleThirdDateChangeUnder}
            />
          </div>
          <div className="flex">
            <div className="w-50 mt-2 p-2">
              <h2 className="text-white">Escolha o spread Fonte:</h2>
              <TreeSelect {...tProps} />;
            </div>
            <div className="w-50 mt-2 p-2" style={{ marginLeft: "20px" }}>
              <h2 className="text-white">Escolher o Submercado</h2>
              <Select
                // defaultValue="lucy"
                style={{ width: 170 }}
                onChange={handleEnergy}
                options={[
                  { value: "SE", label: "Sudeste" },
                  { value: "S", label: "Sul" },
                  { value: "NE", label: "Nordeste" },
                  { value: "N", label: "Norte" },
                ]}
              />

              {/* <button type="submit">Atualizar Gráfico</button> */}
            </div>
           
            <div className="w-50 mt-2 p-2 ml-[18vw]">
              <h2 className="text-white">Escolha o spread Submercado:</h2>
              <TreeSelect {...tProps1} />;
            </div>
            <div className="w-50 mt-2 p-2" style={{ marginLeft: "20px" }}>
              <h2 className="text-white">Escolher o Fonte</h2>
              <Select
                defaultValue={selectedSourcemercado}
                style={{ width: 170 }}
                onChange={handleEnergy1}
                options={[
                  { value: "conv", label: "conv" },
                  { value: "i0", label: "i0" },
                  { value: "i50", label: "i50" },
                  { value: "i100", label: "i100" },
                  { value: "preco_conv", label: "preco_conv" },
                  { value: "preco_i0", label: "preco_i0" },
                  { value: "preco_i50", label: "preco_i50" },
                  { value: "preco_i100", label: "preco_i100" }
                ]}
              />

              {/* <button type="submit">Atualizar Gráfico</button> */}
            </div>
            
           
          </div>
        </div>
      </form>
      <div className="grid grid-cols-2 w-full p-5 gap-5 h-screen">
        <div className="grid grid-cols-1 gap-5">
          <div style={{height: '25vw'}} className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart5
              selectedSubmercado={selectedSubmercadoUnder}
              firstDate={firstDateUnder}
              secondDate={secondDateUnder}
              thirdDate={thirdDateUnder}
              submercado={selectedSubmercadoUnder}
              spreadEnergy={value}

            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div style={{height: '25vw'}} className="w-full flex justify-center flex-col rounded-lg px-2 bg-[white]">
            <CurvaForwardChart6
              selectedSourcecado={selectedSourcemercado}
              firstDate={firstDateUnder}
              secondDate={secondDateUnder}
              thirdDate={thirdDateUnder}
              sourcemercado={selectedSourcemercado}       
              spreadSubmarket={Subvalue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurvaForward;
