import { useState } from "react"

import { BsBarChartFill, BsGraphUp, BsGraphDownArrow, BsListCheck, BsList } from "react-icons/bs"
import { FaBalanceScaleLeft, FaRegChartBar } from "react-icons/fa"
import { BiWorld, BiSolidDashboard, BiImport } from "react-icons/bi"
import { GiMaterialsScience } from "react-icons/gi"
import { MdStackedLineChart } from "react-icons/md"

import { Link } from "react-router-dom"

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const Menus = [
    { title: "Dashboard", icon: <BiSolidDashboard />},
    { title: "Curva Forward", icon: <BsGraphUp />},
    { title: "portfolio", icon: <FaBalanceScaleLeft />},
    { title: "VaR Global e Fontes", icon: <BiWorld />},
    { title: "Drawdown e Stop Loss", icon: <BsGraphDownArrow />, },
    { title: "Risco Caixa e Média Móvel", icon: <FaRegChartBar />},
    { title: "Stress Test", icon: <BsListCheck />},
    { title: "Risco Volumétrico", icon: <MdStackedLineChart />},
    { title: "Risco Contraparte", icon: <BsBarChartFill />},
    { title: "Importação de Dados", icon: <BiImport />},
    { title: "Data Science", icon: <GiMaterialsScience />},
  ]

  function formatTitleForURL(title) {
    // Remove acentos e cedilhas
    const normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Substitua espaços por hifens e transforme em minúsculas
    return normalizedTitle.toLowerCase().replace(/ /g, "-");
  }

  return (
    <div className="flex">
      <div
        className={`bg-[#1f2a40] h-full p-3 pt-8 relative ${open ? "w-60" : "w-20"}`}
      >
        <div className="flex justify-between gap-x-4 items-center pl-4">
    
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "hidden"
            }`}
          >
            Software
          </h1>
          <BsList className="text-white ml-1 cursor-pointer" onClick={(e) => {
            setOpen(!open)
          }}/>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => {
            const urlTitle = formatTitleForURL(Menu.title);

            return (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm gap-x-3 pl-4
                ${Menu.gap ? "mt-9" : "mt-2"}`}
              >
                <Link to={`/${urlTitle}`} className="flex pl-1 items-center gap-x-2">
                  {Menu.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar