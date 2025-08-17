"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesChartProps {
  data: Record<string, any>[];
  xKey?: string;
}

const SalesChart = ({ data = [], xKey = "name" }: SalesChartProps) => {
  const numericKeys =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (key) => key !== xKey && typeof data[0][key] === "number",
        )
      : [];

  if (data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {numericKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
