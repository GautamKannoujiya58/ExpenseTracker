import ModalForm from "../ModalComponent/ModalForm/ModalForm";
import styles from "./Transactions.module.css";
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
      <div className={styles.transactionsDiv}>
        <div className={styles.walletDiv}>
          <div className={styles.walletBalanceDiv}>
            <h2>Wallet Balance:</h2>
            <h2>₹{balance}</h2>
          </div>
          <button id="addBalance" onClick={handleMainButtonClick}>
            + Add balance
          </button>
        </div>

        <div className={styles.expenseDiv}>
          <div className={styles.expenseBalanceDiv}>
            <h2>Expenses:</h2>
            <h2>₹{expense}</h2>
          </div>
          <button id="addExpense" onClick={handleMainButtonClick}>
            + Add Expense
          </button>
        </div>
      </div>

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

// Prop type validation
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
