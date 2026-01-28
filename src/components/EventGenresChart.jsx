import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie } from "recharts";


const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre),
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  };

   const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
   const RADIAN = Math.PI / 180;
   const radius = outerRadius;
   const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
   const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
   return percent ? (
     <text
       x={x}
       y={y}
       fill="#8884d8"
       textAnchor={x > cx ? 'start' : 'end'}
       dominantBaseline="central"
     >
       {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
     </text>
   ) : null;
 };

  return (
    <div style={{ width: "99%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" labelLine={false} label={renderCustomizedLabel} outerRadius={130} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventGenresChart;
