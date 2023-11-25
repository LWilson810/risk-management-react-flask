import React, { useState, useEffect } from "react";
import { getDatafwdCurva } from "../../slices/curvaSlice";
import { useDispatch, useSelector } from "react-redux";

const Table = ({ data, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div className="flex mr-3">
            <table>
                <thead className="border border-blue-500 bg-blue-500 text-white">
                    <tr>
                        <th className="text-sm w-16">Sudeste</th>
                        <th className="text-sm w-16">Sul</th>
                        <th className="text-sm w-16">Nordeste</th>
                        <th className="text-sm w-16">Norte</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((value, columnIndex) => (
                                <td key={columnIndex} className="border border-gray-500">
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(e, rowIndex, columnIndex)}
                                        className="w-full focus:outline-none"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </form>
);

const Table2 = ({ data, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <div className="flex mr-3">
            <table>
                <thead className="border border-blue-500 bg-blue-500 text-white">
                    <tr>
                        <th className="text-sm w-16">Data Forward</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((value, columnIndex) => (
                                <td key={columnIndex} className="border border-gray-500">
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(e, rowIndex, columnIndex)}
                                        className="w-full focus:outline-none"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </form>
);

const ImportData = () => {
    const [data, setData] = useState(
        Array.from({ length: 20 }, () => Array.from({ length: 4 }, () => ""))
    );

    const [data2, setData2] = useState([]);

    const dispatch = useDispatch();

    const { curvas } = useSelector((state) => state.curva);

    useEffect(() => {

        dispatch(getDatafwdCurva())
    }, [dispatch]); // O segundo parâmetro [] garante que o efeito seja executado apenas uma vez ao montar o componente

    const handleChange = (e, rowIndex, columnIndex) => {
        const newData = [...data];
        newData[rowIndex][columnIndex] = e.target.value;
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(data2);

    };

    return (
        <>
            <div className="flex my-8 ml-8 md-8">
                <div className="flex">
                <div>
                    <h2>Datas</h2>
                    <Table2
                        data={data2}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    {/* Usando map para renderizar os dados
                    {curvas.map((curva, index) => (
                        <div key={index}>
                            <span>Data: {curva.data}</span>
                            <br />
                        </div>
                    ))} */}
                </div>
                    <div className="ml-4">
                        <h2>Convencional</h2>
                        <Table
                            data={data}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>

                    {/* Restante do código... */}
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Subir ao Banco
                    </button>
                </div>
            </div>
        </>
    );
};

export default ImportData;