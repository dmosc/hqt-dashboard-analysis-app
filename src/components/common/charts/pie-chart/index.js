import React, {Component} from 'react';
import {PieChart as PChart, Pie, Cell, Tooltip} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieChart extends Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    const {data: oldData} = this.props;

    const data = Object.keys(oldData).map(key => ({
      name: key,
      value: oldData[key],
    }));

    this.setState({data});
  };

  render() {
    const {data} = this.state;

    return (
      <PChart
        width={200}
        height={200}
        margin={{top: 0, right: 0, left: 0, bottom: 0}}
      >
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell
              key={`cell-${i}`}
              fill={entry.name === 'ins' ? 'green' : 'red'}
            />
          ))}
        </Pie>
        <Tooltip />
      </PChart>
    );
  }
}

export default PieChart;
