import { PiPizzaThin } from "react-icons/pi";
import { MdOutlineMovieFilter } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import TopExpenses from "../TopExpenses/TopExpenses";
import PropTypes from "prop-types";

function RecentTransactions({
  expensesList,
  handleEditExpense,
  handleDeleteExpense,
}) {
  // Assigned a icon with respect to category
  const categoryIcons = {
    Entertainment: <MdOutlineMovieFilter />,
    Food: <PiPizzaThin />,
    Travel: <CiRollingSuitcase />,
  };

  // reversed the expenseList to show the last entered trasaction first in the row
  const reversedExpensesList = [...expensesList].reverse();
  // console.log("reversedExpenseList >>>", reversedExpensesList);

  return (
    <>
      {reversedExpensesList.map((list) => (
        <div key={list.id} id={list.id}>
          {categoryIcons[list.category] || <GiPayMoney />}
          <p>{list.title}</p>
          <p>{list.date}</p>
          <p>{list.addedExpense}</p>
          <button id="editExpenses" onClick={(e) => handleEditExpense(e, list)}>
            Edit transacion
          </button>
          <button onClick={(e) => handleDeleteExpense(e, list.id)}>
            Delete Transaction
          </button>
        </div>
      ))}
      <br></br>
      <TopExpenses expensesList={expensesList} />
      <br></br>
    </>
  );
}
RecentTransactions.propTypes = {
  expensesList: PropTypes.array.isRequired,
  handleEditExpense: PropTypes.func.isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
};
export default RecentTransactions;
