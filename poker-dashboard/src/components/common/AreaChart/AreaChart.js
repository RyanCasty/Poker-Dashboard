import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './AreaChart.css';

const AreaChartFillByValue = ({ data }) => {
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.uv));
    const dataMin = Math.min(...data.map((i) => i.uv));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="area-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              {/* Gradient for positive values (green) */}
              <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset={off} stopColor="#82ca9d" stopOpacity={0.4} />
              {/* Gradient for negative values (red) */}
              <stop offset={off} stopColor="#ff4d4d" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ff4d4d" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fill="url(#splitColor)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartFillByValue;
