import ModalForm from "../ModalComponent/ModalForm/ModalForm";
import PropTypes from "prop-types";

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
  handleFormInputChange,
  expenseFormValues,
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
        handleFormInputChange={handleFormInputChange}
        expenseFormValues={expenseFormValues}
      />
    </>
  );
}

Transactions.propTypes = {
  balance: PropTypes.number.isRequired,
  setBalance: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  handleMainButtonClick: PropTypes.func.isRequired,
  buttonId: PropTypes.string.isRequired,
  expense: PropTypes.number.isRequired,
  setExpense: PropTypes.func.isRequired,
  handleBalanceSubmit: PropTypes.func.isRequired,
  addedBalance: PropTypes.string.isRequired,
  setAddedBalance: PropTypes.func.isRequired,
  handleExpenseSubmit: PropTypes.func.isRequired,
  handleFormInputChange: PropTypes.func.isRequired,
  expenseFormValues: PropTypes.object.isRequired,
};

export default Transactions;
