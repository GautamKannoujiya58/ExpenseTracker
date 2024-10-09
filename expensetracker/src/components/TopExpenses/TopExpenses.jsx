import { BarChart, Bar, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import styles from "./TopExpenses.module.css";
import { useEffect, useState } from "react";

function TopExpenses({ expensesList }) {
  const [barchartWidth, setBarChartWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth <= 900) {
        setBarChartWidth(300);
      } else {
        setBarChartWidth(400);
      }
    };
    window.addEventListener("resize", handleScreenResize);

    // cleanup function
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);
  console.log("expensesList from top>>", expensesList);
  let entertainmentAmt = 0;
  let foodAmt = 0;
  let travelAmt = 0;
  let otherAmt = 0;

  expensesList.forEach((list) => {
    const expense = Number(list.addedExpense);
    switch (list.category) {
      case "Entertainment":
        entertainmentAmt += expense;
        break;
      case "Food":
        foodAmt += expense;
        break;
      case "Travel":
        travelAmt += expense;
        break;
      case "Others":
        otherAmt += expense;
        break;
      default:
        break;
    }
  });

  const data = [
    { category: "Entertainment", totalExpense: entertainmentAmt },
    { category: "Food", totalExpense: foodAmt },
    { category: "Travel", totalExpense: travelAmt },
    { category: "Others", totalExpense: otherAmt },
  ];
  return (
    <>
      <div className={styles.topExpensesMainDiv}>
        <BarChart
          width={barchartWidth} // Width of the chart
          height={350} // Height of the chart
          data={data} // Data array containing the values for bars
          layout="vertical" // This makes the bars horizontal
          margin={{ top: 5, right: 30, left: 30, bottom: 20, borderRadius: 4 }} // Margin around the chart
        >
          <YAxis
            type="category"
            dataKey="category"
            width={100}
            axisLine={false} // Removes the Y axis line
            tickLine={false}
          />
          <XAxis type="number" hide={true} />
          {/* <Tooltip /> */}
          <Bar
            dataKey="totalExpense"
            fill="#8884d8"
            barSize={20}
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </div>
    </>
  );
}
TopExpenses.propTypes = {
  expensesList: PropTypes.array.isRequired,
};

export default TopExpenses;
