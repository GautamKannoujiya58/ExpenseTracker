import { PiPizzaThin } from "react-icons/pi";
import { MdOutlineMovieFilter } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import TopExpenses from "../TopExpenses/TopExpenses";
// import EditTransactions from "../EditTransactions/EditTransactions";
function RecentTransactions({ expensesList, handleEditExpense }) {
  //   const expensesList = JSON.parse(localStorage.getItem("expensesList"));
  const categoryIcons = {
    Entertainment: <MdOutlineMovieFilter />,
    Food: <PiPizzaThin />,
    Travel: <CiRollingSuitcase />,
  };
  return (
    <>
      {expensesList.map((list) => (
        <div key={list.id} id={list.id}>
          {categoryIcons[list.category] || <GiPayMoney />}
          <p>{list.title}</p>
          <p>{list.date}</p>
          <p>{list.addedExpense}</p>
          <button id="editExpenses" onClick={() => handleEditExpense(list)}>
            Edit transacion
          </button>
        </div>
      ))}
      <TopExpenses />
    </>
  );
}
export default RecentTransactions;
