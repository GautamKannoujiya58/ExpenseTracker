import Transactions from "../components/Transactions/Transactions";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

function ExpenseTracker() {
  // const [balance, setBalance] = useState(5000);
  // const [expense, setExpense] = useState("");
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [buttonId, setButtonId] = useState("");

  const [title, setTitle] = useState("");
  const [addedBalance, setAddedBalance] = useState("");
  const [addedExpense, setAddedExpense] = useState("");
  const [category, setCategory] = useState("DEFAULT");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // console.log("AddedBalance >>>", addedBalance);
  // localStorage.setItem("balance", balance);

  const [balance, setBalance] = useState(
    () => Number(localStorage.getItem("balance")) || 5000 // lazy initialization: When you pass a function to useState, that function is only called once, during the initial render.
  );
  const [expense, setExpense] = useState(
    () => Number(localStorage.getItem("totalExpense")) || 0
  );

  // Why Lazy initialization:
  //  In your case, you're fetching the initial balance from localStorage,
  //  and the balance might change frequently during the app's lifetime.
  // You don't want to run the localStorage.getItem("balance")
  // check every time the component renders — only on the first load.
  // That's where lazy initialization helps optimize performance.

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("totalExpense", expense);
  }, [expense]);

  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  console.log(">>>>>>>>>>>>>", storedExpenses);
  const newExpense = { title, addedExpense, category, date };
  localStorage.setItem(
    "expenses",
    JSON.stringify([...storedExpenses, newExpense])
  );
  console.log("Expenses >>>>", newExpense);

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (addedBalance <= 0) {
      enqueueSnackbar("Balance or Expense should be greater than 0", {
        variant: "warning",
      });
      closeModal();
      return;
    }
    setBalance((prev) => prev + Number(addedBalance));
    closeModal();
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (addedExpense <= 0 || addedExpense > balance) {
      enqueueSnackbar("Invalid expense amount or insufficient balance", {
        variant: "warning",
      });
      return;
    }
    if (category === "DEFAULT") {
      enqueueSnackbar("Please select a category", {
        variant: "warning",
      });
      return;
    }

    setBalance((prevBalance) => prevBalance - Number(addedExpense));
    setExpense((prevExpense) => Number(prevExpense) + Number(addedExpense));

    // console.log("Expense submitted:", { title, addedExpense, category, date });
    // console.log(typeof Number(addedExpense));

    setTitle("");
    setAddedExpense("");
    setCategory("DEFAULT");
    setDate("");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleMainButtonClick = (e) => {
    openModal();
    setButtonId(e.target.id);
  };

  return (
    <>
      <h1>Expense Tracker</h1>
      <Transactions
        balance={balance}
        setBalance={setBalance}
        setIsModalOpen={setIsModalOpen}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        openModal={openModal}
        handleMainButtonClick={handleMainButtonClick}
        addedBalance={addedBalance}
        setAddedBalance={setAddedBalance}
        buttonId={buttonId}
        expense={expense}
        setExpense={setExpense}
        addedExpense={addedExpense}
        setAddedExpense={setAddedExpense}
        handleBalanceSubmit={handleBalanceSubmit}
        title={title}
        setTitle={setTitle}
        handleExpenseSubmit={handleExpenseSubmit}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />
    </>
  );
}
export default ExpenseTracker;
