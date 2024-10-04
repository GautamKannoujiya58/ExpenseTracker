// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// function ExpensePieChart({ expensesList }) {
//   let data = [];
//   expensesList.map((list) =>
//     data.push({ category: list.category, value: Number(list.addedExpense) })
//   );
//   //   console.log(">>>", data);

//   // Colors for the PieChart
//   const PICHART_COLORS_MAP = {
//     Food: "#A000FF",
//     Entertainment: "#FF9304",
//     Travel: "#FDE006",
//     Others: "#B2BEB5",
//   };

//   // Customized label to display inside each Pie slice
//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent,
//   }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`}
//               fill={PICHART_COLORS_MAP[entry.category]}
//             />
//           ))}
//         </Pie>
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default ExpensePieChart;

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function ExpensePieChart({ expensesList }) {
  // Grouping expenses by category and summing their values
  const groupedData = expensesList.reduce((acc, curr) => {
    const { category, addedExpense } = curr;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(addedExpense); // Summing up the expenses for each category
    return acc;
  }, {});

  // Transforming grouped data into an array for the PieChart
  const data = Object.keys(groupedData).map((category) => ({
    category,
    value: groupedData[category],
  }));

  // Colors for the PieChart
  const PICHART_COLORS_MAP = {
    Food: "#A000FF",
    Entertainment: "#FF9304",
    Travel: "#FDE006",
    Others: "#B2BEB5",
  };

  // Customized label to display inside each Pie slice
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PICHART_COLORS_MAP[entry.category] || "#8884d8"}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpensePieChart;
