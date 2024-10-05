import Transactions from "../components/Transactions/Transactions";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ExpensePieChart from "../components/ExpensePieChart/ExpensePieChart";
import RecentTransactions from "../components/RecentTransactions/RecentTransactions";

function ExpenseTracker() {
  // const [balance, setBalance] = useState(5000);
  // const [expense, setExpense] = useState("");
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [buttonId, setButtonId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const [addedBalance, setAddedBalance] = useState("");
  // const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  // const [title, setTitle] = useState("");
  // const [addedExpense, setAddedExpense] = useState("");
  // const [category, setCategory] = useState("DEFAULT");
  // const [date, setDate] = useState("");

  // getting form elements title, price, category and date
  const [expenseFormValues, setExpenseFormValues] = useState({
    title: "",
    addedExpense: "",
    category: "",
    date: "",
  });

  // storing the added list
  const [expensesList, setExpensesList] = useState(
    () => JSON.parse(localStorage.getItem("expensesList")) || []
  );
  console.log("ExpenseList >>>>", expensesList);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormValues({ ...expenseFormValues, [name]: value });
  };
  // console.log("expenseForm >>>", expenseFormValues);
  // console.log("ExpenseList >>>", expensesList);
  // imported enqueSnackbar for alerts
  const { enqueueSnackbar } = useSnackbar();
  // console.log("AddedBalance >>>", addedBalance);
  // localStorage.setItem("balance", balance);

  const [balance, setBalance] = useState(
    () => Number(localStorage.getItem("balance")) || 5000 // lazy initialization: When you pass a function to useState, that function is only called once, during the initial render.
  );
  const [expense, setExpense] = useState(
    () => Number(localStorage.getItem("totalExpense")) || 0
  );
  // const listRef = useRef("");
  // console.log("Balance >>>", balance);
  // console.log("Expense >>>", expense);

  // console.log("ExpenseListfromLocal >>>", localStorage.getItem("expenseList"));

  // Why Lazy initialization:
  // In your case, you're fetching the initial balance from localStorage,
  // and the balance might change frequently during the app's lifetime.
  // You don't want to run the localStorage.getItem("balance")
  // check every time the component renders — only on the first load.
  // That's where lazy initialization helps optimize performance.

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("totalExpense", expense);
  }, [expense]);

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  // Handling particular EditExpense click button
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
  const handleDeleteExpense = (e, listId) => {
    const expenseToDelete = expensesList.find((list) => list.id === listId);

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
    enqueueSnackbar("Transaction deleted successfully", { variant: "success" });
  };

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
    enqueueSnackbar(`Balance ${balance} added successfully`, {
      variant: "success",
    });
    setAddedBalance("");
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const { title, addedExpense, category, date } = expenseFormValues;

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
      const expenseDifference =
        Number(addedExpense) - Number(originalExpense.addedExpense);
      setBalance((prevBalance) => prevBalance - Number(expenseDifference));
      setExpense((prevExpense) => prevExpense + expenseDifference);

      enqueueSnackbar(`Balance ${balance} added successfully`, {
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
      enqueueSnackbar("New expense added successfully", { variant: "success" });
    }

    // How you can add attribute to that object while calling a function

    // console.log("Expense submitted:", { title, addedExpense, category, date });
    // console.log(typeof Number(addedExpense));

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

  //  useEffect(()=>{

  //  })
  const handleMainButtonClick = (e) => {
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
        // addedExpense={addedExpense}
        // setAddedExpense={setAddedExpense}
        handleBalanceSubmit={handleBalanceSubmit}
        // title={title}
        // setTitle={setTitle}
        handleExpenseSubmit={handleExpenseSubmit}
        // category={category}
        // setCategory={setCategory}
        // date={date}
        // setDate={setDate}
        handleFormInputChange={handleFormInputChange}
        expenseFormValues={expenseFormValues}
      />
      <ExpensePieChart expensesList={expensesList} />
      <RecentTransactions
        expensesList={expensesList}
        handleEditExpense={handleEditExpense}
        handleDeleteExpense={handleDeleteExpense}
      />
    </>
  );
}
export default ExpenseTracker;
