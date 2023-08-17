import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
  { date: '16/06', total: 500000 },
  { date: '17/06', total: 600000 },
  { date: '18/06', total: 750000 },
  { date: '19/06', total: 650000 },
  { date: '20/06', total: 820000 },
  { date: '21/06', total: 960000 },
  { date: '22/06', total: 860000 },
];

export default function Chart() {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type='monotone'
        dataKey='total'
        stroke='#adfa1d'
      />
      {/* <CartesianGrid
        stroke='#ccc'
        strokeDasharray='5 5'
      /> */}
      <XAxis
        dataKey='date'
        stroke='#888888'
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      {/* <XAxis dataKey='date' /> */}
      <YAxis
        stroke='#888888'
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `$${value}`}
      />
      {/* <YAxis /> */}
      <Tooltip />
    </LineChart>
  );
}
