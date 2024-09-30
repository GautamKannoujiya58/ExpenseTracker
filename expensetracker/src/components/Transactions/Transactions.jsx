import ModalForm from "../ModalComponent/ModalForm/ModalForm";

function Transactions({
  balance,
  setBalance,
  modalIsOpen,
  closeModal,
  openModal,
  handleMainButtonClick,
  buttonId,
  expense,
  setExpense,
  handleBalanceSubmit,
  addedBalance,
  setAddedBalance,
  handleExpenseSubmit,
  title,
  setTitle,
  addedExpense,
  setAddedExpense,
  category,
  setCategory,
  date,
  setDate,
}) {
  return (
    <>
      <p>Wallet Balance: ₹{balance}</p>
      <button id="addBalance" onClick={handleMainButtonClick}>
        Add balance
      </button>

      <p>Expenses:₹{expense}</p>
      <button id="addExpense" onClick={handleMainButtonClick}>
        Add Expenses
      </button>

      <ModalForm
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        setBalance={setBalance}
        buttonId={buttonId}
        handleBalanceSubmit={handleBalanceSubmit}
        addedBalance={addedBalance}
        setAddedBalance={setAddedBalance}
        handleExpenseSubmit={handleExpenseSubmit}
        expense={expense}
        setExpense={setExpense}
        title={title}
        setTitle={setTitle}
        addedExpense={addedExpense}
        setAddedExpense={setAddedExpense}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />
    </>
  );
}

export default Transactions;
