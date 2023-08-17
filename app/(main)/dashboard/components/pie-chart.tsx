import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400, color: '#a3e635' },
  { name: 'Group B', value: 300, color: '#0f766e' },
  { name: 'Group C', value: 300, color: '#e0f2fe' },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function Chart() {
  return (
    // <ResponsiveContainer
    //   width='100%'
    //   height='100%'
    // >
    <PieChart
    // width={200}
    // height={200}
    >
      <Pie
        data={data}
        dataKey='value'
        // nameKey='name'
        cx='50%'
        cy='50%'
        innerRadius={30}
        outerRadius={60}
        // fill='#8884d8'
        // legendType='none'
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
          />
        ))}
      </Pie>
    </PieChart>
    // </ResponsiveContainer>
  );
}
