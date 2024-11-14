import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const DashBoard = () => {
  // Sample data for bar chart
  const barData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];

  // Sample data for pie chart
  const pieData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='bg-slate-600 h-auto p-8 mt-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Bar Chart Section */}
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Monthly Statistics</h2>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart Section */}
        <div className='bg-white w-auto p-4 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Distribution</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={pieData}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
