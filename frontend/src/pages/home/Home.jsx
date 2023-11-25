import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import CurvaForwardChart from "../../components/CurvaForwardChart";
import CurvaForwardBarChat from "../../components/CurvaForwardBarChat";
import DashboardCard10 from "../../components/DashboardCard10";

const Home = () => {

  const user_info = useSelector((state) => state.user);
  const navigator = useNavigate();
  useEffect(()=>{
    if(!user_info.loggedIn)
      navigator("/sign-in")
  }, [user_info])
  return (
    <div>
      <div className="grid grid-cols-12 gap-1">
        <h1 className="text-white col-span-full text-3xl font-bold">DASHBOARD</h1>
        <h4 className="text-[#70d8bd] col-span-full">Welcome to your Dashboard</h4>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="flex flex-col col-span-full sm:col-span-12 bg-[#1f2a40] dark:bg-slate-800 shadow-lg rounded-sm">
          <CurvaForwardChart 
              firstDate={"2019-01-02"}
              secondDate={"2019-02-01"}
              thirdDate={"2019-03-01"}
              submercado={"S"}/>
        </div>
        <div className="flex flex-col col-span-full sm:col-span-12 bg-[#1f2a40] dark:bg-slate-800 shadow-lg rounded-sm">
          <CurvaForwardBarChat
            firstDate={"2019-01-02"}
            secondDate={"2019-02-01"}
            thirdDate={"2019-03-01"}
            submercado={"S"}
          />
        </div>
        <div className="flex flex-col col-span-full sm:col-span-12 bg-[#1f2a40] dark:bg-slate-800 shadow-lg rounded-sm">
          <DashboardCard10/>
        </div>
      </div>
    </div>
  );
};

export default Home;
