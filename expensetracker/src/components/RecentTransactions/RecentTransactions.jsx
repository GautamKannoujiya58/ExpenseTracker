import { PiPizzaThin } from "react-icons/pi";
import { MdOutlineMovieFilter } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import TopExpenses from "../TopExpenses/TopExpenses";
import PropTypes from "prop-types";
// import Pagination from "../Pagination/Pagination";
import { useState } from "react";

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

  // Pagination implementation below
  // Per expense to be displayed on the page
  const expensePerPage = 3;

  // For setting the current page value
  const [currentPage, setCurrentPage] = useState(1);

  // For calculating what no of pages can be there
  const totalPages = Math.ceil(reversedExpensesList.length / expensePerPage);

  // slicing the first three of the next 3 transactions
  const currentExpenseToDisplay = reversedExpensesList.slice(
    (currentPage - 1) * expensePerPage,
    currentPage * expensePerPage
  );
  // console.log("currentExpenseToDisplay", currentExpenseToDisplay);

  // Button click event handling
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // console.log("reversedExpenseList >>>", reversedExpensesList);

  return (
    <>
      {currentExpenseToDisplay.map((list) => (
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
      <button onClick={handlePrev}>⬅️Prev</button>
      <button onClick={handleNext}>➡️Next</button>
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
