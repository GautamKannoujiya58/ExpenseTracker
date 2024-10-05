import Modal from "react-modal";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import PropTypes from "prop-types";
function ModalForm({
  modalIsOpen,
  closeModal,
  buttonId,
  handleBalanceSubmit,
  addedBalance,
  setAddedBalance,
  handleExpenseSubmit,
  handleFormInputChange,
  expenseFormValues,
}) {
  // console.log("expenseFormValues >>>", expenseFormValues);
  return (
    <>
      {buttonId === "addBalance" ? (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Add balance</h2>
          <form onSubmit={handleBalanceSubmit}>
            <input
              type="number"
              placeholder="balance amount"
              value={addedBalance}
              onChange={(e) => setAddedBalance(e.target.value)}
              required
            ></input>
            <button type="submit">Add balance</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      ) : (
        <AddExpenseForm
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleExpenseSubmit={handleExpenseSubmit}
          expenseFormValues={expenseFormValues}
          handleFormInputChange={handleFormInputChange}
          buttonId={buttonId}
        />
      )}
    </>
  );
}

// For warning propTypes validation (not much important)
ModalForm.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  buttonId: PropTypes.string.isRequired,
  handleBalanceSubmit: PropTypes.func.isRequired,
  addedBalance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setAddedBalance: PropTypes.func.isRequired,
  handleExpenseSubmit: PropTypes.func.isRequired,
  handleFormInputChange: PropTypes.func.isRequired,
  expenseFormValues: PropTypes.object.isRequired,
};
export default ModalForm;
