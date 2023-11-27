import React, { useState, useEffect } from "react";
import { DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import CurvaForwardChart from "../../components/CurvaForwardChart";
import CurvaForwardChart2 from "../../components/CurvaForwardChart2";
import CurvaForwardChart3 from "../../components/CurvaForwardChart3";
import CurvaForwardChart4 from "../../components/CurvaForwardChart4";
import PortfolioChart from "../../components/PortfolioChart";
import PortfolioChart1 from "../../components/PortfolioChart1";

import { useDispatch } from "react-redux";
import {
  getCurvaSudesteConv,
  getCurvaSudeste1Conv,
  getCurvaNordesteConv,
  getCurvaNorteConv,
  getDataFromSubmarket,
  getOperas,
} from "../../slices/curvaSlice";
import { TreeSelect, Select } from "antd";
const { SHOW_PARENT } = TreeSelect;

const Portfolio = () => {
  const date = new Date().toISOString();
  const dispatch = useDispatch();

  const [selectedSubmercado, setSelectedSubmercado] = useState("ALL");
  const [selectedenergySource, setSelectedenergysource] = useState("ALL");
  const [selectedSubmercadoUnder, setSelectedSubmercadoUnder] = useState("");
  const [selectedSourcemercado, setSelectedSourcemercado] = useState("");

  selectedSourcemercado;
  const [firstDate, setFirstDate] = useState("2019-01-02");
  const [secondDate, setSecondDate] = useState("2019-02-01");
  const [thirdDate, setThirdDate] = useState("2019-03-01");
  const [firstDateUnder, setFirstDateUnder] = useState("2019-01-02");
  const [secondDateUnder, setSecondDateUnder] = useState("2019-02-01");
  const [thirdDateUnder, setThirdDateUnder] = useState("2019-03-01");
  const [value, setValue] = useState([]);
  const [Subvalue, setSubValue] = useState([]);

  const user_info = useSelector((state) => state.user);
  const opera = useSelector((state) => state.opera);
  const navigator = useNavigate();
  useEffect(() => {
    dispatch(getOperas());
  });
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
    if (newValue.length == 2) {
      console.log("all submarket", newValue);
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
    setSelectedSubmercado(e.target.value);
  };
  const handleEnergySource = (e) => {
    console.log("e.tar", e.target.value);
    setSelectedenergysource(e.target.value);
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
          Portfolio
        </h1>
        {/* <h4 className="text-[#70d8bd] col-span-full">Welcome to your Dashboard</h4> */}
      </div>
      <form>
        <div className="flex justify-evenly p-5 mt-5 ml-5 mr-5 rounded-lg bg-[#1f2a40]">
          <div className="w-50 mt-2 p-2" style={{ display: "center" }}>
            <div>
              <h2 className="text-white">Escolha o dia:</h2>
              <input
                type="date"
                placeholder="Data inicial"
                className="w-21 mr-2 border-2 border-black rounded-md"
                value={firstDate}
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={handleFirstDateChange}
              />
            </div>
            <div>
              <h2 className="text-white">Submarket</h2>

              <select
                className="h-7 border-none rounded-md"
                value={selectedSubmercado}
                onChange={handleSubmercadoChange}
              >
                <option value="ALL">All</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Norte">Norte</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <div
        className="grid grid-rows-2 w-full p-5 gap-5 h-screen"
        style={{ height: "58vh" }}
      >
        <div className="grid  gap-5">
          <div className="w-full flex justify-center  rounded-lg px-2 bg-[white]">
            <PortfolioChart
              submercado={selectedSubmercado}
              firstDate={firstDate}
            />
          </div>
        </div>
      </div>
      <form>
        <div className="flex justify-evenly p-5 mt-5 ml-5 mr-5 rounded-lg bg-[#1f2a40]">
          <div className="w-50 mt-2 p-2">
            <h2 className="text-white">Submarket</h2>

            <select
              className="h-7 border-none rounded-md"
              value={selectedenergySource}
              onChange={handleEnergySource}
            >
              <option value="Convencional">Convencional</option>
              <option value="Incentivada 50%">Incentivada 50%</option>
              <option value="Incentivada 100%">Incentivada 100%</option>
            </select>
          </div>
        </div>
      </form>
      <div className="grid grid-rows-2 w-full p-5 gap-5 h-screen">
        <div className="grid  gap-5">
          <div
            className="w-full flex justify-center  rounded-lg px-2 bg-[white]"
            style={{ height: "58vh" }}
          >
            {/* <CurvaForwardChart
              selectedSubmercado={selectedSubmercado}
              firstDate={firstDate}
              secondDate={secondDate}
              thirdDate={thirdDate}
              submercado={selectedSubmercado}
            /> */}
            <PortfolioChart1
              submercado={selectedenergySource}
              firstDate={firstDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
