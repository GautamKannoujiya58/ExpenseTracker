import Transactions from "../components/Transactions/Transactions";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ExpensePieChart from "../components/ExpensePieChart/ExpensePieChart";
import RecentTransactions from "../components/RecentTransactions/RecentTransactions";
import styles from "./ExpenseTracker.module.css";

function ExpenseTracker() {
  const [modalIsOpen, setIsModalOpen] = useState(false); // For Modal flag => true/false
  const [buttonId, setButtonId] = useState(""); // for setting the buttonId on clicking AddBalance,AddExpense,EditExpense,DeleteExpense
  const [isEditing, setIsEditing] = useState(false); // for editing AddExpense flag
  const [editingExpenseId, setEditingExpenseId] = useState(null); // getting particular id of the transaction

  // imported enqueSnackbar for alerts
  const { enqueueSnackbar } = useSnackbar();

  const [addedBalance, setAddedBalance] = useState(""); // state for added balance (by user)

  // getting form elements title, price, category and date (⚠️important)
  const [expenseFormValues, setExpenseFormValues] = useState({
    title: "",
    addedExpense: "",
    category: "",
    date: "",
  });

  // Accessing the expenseList (added expenses) from localStorage using lazy initialization
  const [expensesList, setExpensesList] = useState(
    () => JSON.parse(localStorage.getItem("expensesList")) || []
  );
  // console.log("ExpenseList >>>>", expensesList);

  // For handling the form value entered in <input> fields
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormValues({ ...expenseFormValues, [name]: value });
  };

  // For setting the main wallet balance
  const [balance, setBalance] = useState(
    () => Number(localStorage.getItem("balance")) || 5000 // lazy initialization: When you pass a function to useState, that function is only called once, during the initial render.
  );

  // For setting the main expense wallet
  const [expense, setExpense] = useState(
    () => Number(localStorage.getItem("totalExpense")) || 0
  );

  // ⚠️ Why Lazy initialization:
  // In your case, you're fetching the initial balance from localStorage,
  // and the balance might change frequently during the app's lifetime.
  // You don't want to run the localStorage.getItem("balance")
  // check every time the component renders — only on the first load.
  // That's where lazy initialization helps optimize performance.

  // for setting 'balance' into 'localStorage' as soon as page load
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  // for setting 'expense' into 'localStorage' as soon as page load
  useEffect(() => {
    localStorage.setItem("totalExpense", expense);
  }, [expense]);

  // for setting 'expenseList' into 'localStorage' as soon as page load
  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  // Handling particular EditExpense on button click (Edit transaction)
  const handleEditExpense = (e, list) => {
    console.log("Edit expense clicked!");
    console.log("id >>>", e.target.id);
    setButtonId(e.target.id);
    console.log("listHellllllll>>>", list);
    setExpenseFormValues({
      title: list.title,
      addedExpense: list.addedExpense,
      category: list.category,
      date: list.date,
    });
    setIsEditing(true);
    setEditingExpenseId(list.id);

    openModal();
  };

  // Handling deleting particular transaction on button click (delete trasaction)
  const handleDeleteExpense = (e, listId) => {
    // finding the transaction id so that only particularly that id should be deleted
    const expenseToDelete = expensesList.find((list) => list.id === listId);

    // removing that id from the expensesList by filter method
    setExpensesList((prevList) =>
      prevList.filter((list) => list.id !== listId)
    );

    setBalance(
      (prevBalance) => prevBalance + Number(expenseToDelete.addedExpense)
    );
    setExpense(
      (prevExpense) => prevExpense - Number(expenseToDelete.addedExpense)
    );
    // console.log("listId >>", listId);

    enqueueSnackbar("Transaction deleted successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  // For handling main balance addition
  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (addedBalance <= 0) {
      enqueueSnackbar("Balance or Expense should be greater than 0", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      closeModal();
      setAddedBalance("");
      return;
    }
    setBalance((prev) => prev + Number(addedBalance));
    closeModal();
    enqueueSnackbar(`₹${addedBalance} added successfully`, {
      variant: "success",
      autoHideDuration: 2000,
    });
    setAddedBalance("");
  };

  // for handling expense submit form ('Add balance' and 'Done' buttons)
  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    // destructured all the expenses field value from the form by user
    const { title, addedExpense, category, date } = expenseFormValues;

    if (addedExpense <= 0 || addedExpense > balance) {
      enqueueSnackbar("Invalid expense amount or insufficient balance", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    // Special condition for preventing 'Add Expense' on submit (as 'required' attribute was not able to prevent the submission)
    if (!category) {
      enqueueSnackbar("Please select a category", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    // for Editing the expense
    if (isEditing) {
      setExpensesList((prevExpenseList) =>
        prevExpenseList.map((list) =>
          list.id === editingExpenseId
            ? { ...list, title, addedExpense, category, date }
            : list
        )
      );
      const originalExpense = expensesList.find(
        (list) => list.id === editingExpenseId
      );
      // Logic for addition OR subtraction after editing particular transaction
      const expenseDifference =
        Number(addedExpense) - Number(originalExpense.addedExpense);
      setBalance((prevBalance) => prevBalance - Number(expenseDifference));
      setExpense((prevExpense) => prevExpense + expenseDifference);

      enqueueSnackbar(`Expense updated successfully`, {
        variant: "success",
      });
    } else {
      const uniqueId = Date.now();
      setExpensesList((prevExpenseList) => [
        ...prevExpenseList,
        { id: uniqueId, title, addedExpense, category, date, uniqueId },
      ]);
      setBalance((prevBalance) => prevBalance - Number(addedExpense));
      setExpense((prevExpense) => prevExpense + Number(addedExpense));
      enqueueSnackbar("New expense added successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }

    setExpenseFormValues({
      title: "",
      addedExpense: "",
      category: "",
      date: "",
    });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExpenseFormValues({
      title: "",
      addedExpense: "",
      category: "",
      date: "",
    });
    setIsEditing(false);
    setEditingExpenseId(null);
    setButtonId("");
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleMainButtonClick = (e) => {
    // console.log("clickedddddddddd");
    openModal();
    setButtonId(e.target.id);
    setIsEditing(false);
    setEditingExpenseId(null);
    setExpenseFormValues({
      title: "",
      addedExpense: "",
      category: "",
      date: "",
    });
  };

  return (
    <>
      <h1 className={styles.heading}>Expense Tracker</h1>
      <div className={styles.transactionsMainDiv}>
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
          handleBalanceSubmit={handleBalanceSubmit}
          handleExpenseSubmit={handleExpenseSubmit}
          handleFormInputChange={handleFormInputChange}
          expenseFormValues={expenseFormValues}
        />
        {/* <br></br> */}
        <ExpensePieChart expensesList={expensesList} />

        <div className={styles.labelsDiv}>
          <button style={{ backgroundColor: "#A000FF" }}>Food</button>
          <button style={{ backgroundColor: "#FF9304" }}>Entertainment</button>
          <button style={{ backgroundColor: "#FDE006" }}>Travel</button>
          <button style={{ backgroundColor: "#B2BEB5" }}>Others</button>
        </div>
      </div>

      {expense > 0 && (
        <RecentTransactions
          expensesList={expensesList}
          handleEditExpense={handleEditExpense}
          handleDeleteExpense={handleDeleteExpense}
        />
      )}
    </>
  );
}
export default ExpenseTracker;
