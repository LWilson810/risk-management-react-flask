import React from 'react';


function DashboardCard10() {

  const customers = [
    {
      id: '0',
      image: "Image01",
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      image: "Image02",
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    {
      id: '2',
      image: "Image03",
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      location: '🇫🇷',
      spent: '$2,996.00',
    },
    {
      id: '3',
      image: "Image04",
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      location: '🇮🇹',
      spent: '$1,220.66',
    },
    {
      id: '4',
      image: "Image05",
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      location: '🇬🇧',
      spent: '$1,890.66',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-[#1f2a40] dark:bg-slate-800 shadow-lg rounded-sm">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-white dark:text-white">Customers</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-white dark:text-white bg-[#70d8bd]">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Country</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-white dark:text-slate-100">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-white">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center text-white">{customer.location}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
