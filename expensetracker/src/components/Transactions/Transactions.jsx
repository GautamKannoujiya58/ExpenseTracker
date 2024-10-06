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
            <h3>Wallet Balance:</h3>
            <h3>₹{balance}</h3>
          </div>
          <button id="addBalance" onClick={handleMainButtonClick}>
            Add balance
          </button>
        </div>

        <div className={styles.expenseDiv}>
          <div className={styles.expenseBalanceDiv}>
            <h3>Expenses:</h3>
            <h3>₹{expense}</h3>
          </div>
          <button id="addExpense" onClick={handleMainButtonClick}>
            Add Expenses
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
