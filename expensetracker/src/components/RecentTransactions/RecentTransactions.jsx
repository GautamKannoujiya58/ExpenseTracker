import { PiPizzaBold } from "react-icons/pi";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { MdOutlineMovieFilter, MdOutlineDelete, MdEdit } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import TopExpenses from "../TopExpenses/TopExpenses";
import PropTypes from "prop-types";
import styles from "./RecentTransactions.module.css";
import { useState } from "react";
import { IconContext } from "react-icons/lib";

function RecentTransactions({
  expensesList,
  handleEditExpense,
  handleDeleteExpense,
}) {
  // Assigned a icon with respect to category
  const categoryIcons = {
    Entertainment: <MdOutlineMovieFilter />,
    Food: <PiPizzaBold />,
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
  // Utility function to format the date
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr); // Convert string to Date object
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className={styles.headingsDiv}>
        <h1>Recent Transactions</h1>
        <h1>Top Expenses</h1>
      </div>
      <div className={styles.recentMainDiv}>
        <div className={styles.recentTransactionsDiv}>
          {currentExpenseToDisplay.map((list) => (
            <div className={styles.singleListDiv} key={list.id} id={list.id}>
              <div className={styles.iconTitleDiv}>
                <IconContext.Provider
                  value={{ color: "#33363F", size: "24px" }}
                >
                  <div className={styles.icon}>
                    {categoryIcons[list.category] || <GiPayMoney />}
                  </div>
                </IconContext.Provider>

                <div className={styles.titleDate}>
                  <p>{list.title}</p>
                  <p>{formatDate(list.date)}</p>
                </div>
              </div>

              <div className={styles.editDeleteDiv}>
                <p>₹{list.addedExpense}</p>
                <div className={styles.editDeleteButtons}>
                  <button onClick={(e) => handleDeleteExpense(e, list.id)}>
                    <IconContext.Provider
                      value={{ color: "#FFFFFF", size: "37px" }}
                    >
                      <MdOutlineDelete />
                    </IconContext.Provider>
                  </button>

                  <button
                    id="editExpenses"
                    onClick={(e) => handleEditExpense(e, list)}
                  >
                    <IconContext.Provider
                      value={{ color: "#FFFFFF", size: "37px" }}
                    >
                      <MdEdit />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.nextPrevDiv}>
            <button onClick={handlePrev}>
              <IconContext.Provider value={{ size: "24px", color: "#222222" }}>
                <GrFormPreviousLink />
              </IconContext.Provider>
            </button>
            <button className={styles.currentPageDiv}>{currentPage}</button>
            <button onClick={handleNext}>
              <div className={styles.nextIcon}>
                <IconContext.Provider
                  value={{ size: "24px", color: "#222222" }}
                >
                  <GrFormNextLink />
                </IconContext.Provider>
              </div>
            </button>
          </div>
        </div>
        <TopExpenses expensesList={expensesList} />
      </div>
    </>
  );
}
RecentTransactions.propTypes = {
  expensesList: PropTypes.array.isRequired,
  handleEditExpense: PropTypes.func.isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
};
export default RecentTransactions;
