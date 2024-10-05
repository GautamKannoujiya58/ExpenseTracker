import Modal from "react-modal";
function AddExpenseForm({
  modalIsOpen,
  closeModal,
  handleExpenseSubmit,
  expenseFormValues,
  handleFormInputChange,
  buttonId,
}) {
  return (
    <>
      {buttonId === "addExpense" ? (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Add Expense</h2>
          <form onSubmit={handleExpenseSubmit}>
            <input
              name="title"
              placeholder="title"
              type="text"
              required
              value={expenseFormValues.title}
              onChange={handleFormInputChange}
            ></input>
            <input
              name="addedExpense"
              placeholder="price"
              type="number"
              required
              value={expenseFormValues.addedExpense}
              onChange={handleFormInputChange}
            ></input>
            <select
              name="category"
              id="category"
              required
              value={expenseFormValues.category}
              onChange={handleFormInputChange}
            >
              <option value="DEFAULT" disabled hidden>
                Select category
              </option>
              <option required value="Entertainment">
                Entertainment
              </option>
              <option required value="Food">
                Food
              </option>
              <option required value="Travel">
                Travel
              </option>
              <option required value="Others">
                Others
              </option>
            </select>
            <input
              placeholder="dd/mm/yyyy"
              type="date"
              id="date"
              name="date"
              required
              value={expenseFormValues.date}
              onChange={handleFormInputChange}
            ></input>
            <button type="submit">Add Expense</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      ) : (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Edit Expense</h2>
          <form onSubmit={handleExpenseSubmit}>
            <input
              name="title"
              placeholder="title"
              type="text"
              required
              value={expenseFormValues.title}
              onChange={handleFormInputChange}
            ></input>
            <input
              name="addedExpense"
              placeholder="price"
              type="number"
              required
              value={expenseFormValues.addedExpense}
              onChange={handleFormInputChange}
            ></input>
            <select
              name="category"
              id="category"
              required
              value={expenseFormValues.category}
              onChange={handleFormInputChange}
            >
              <option value="DEFAULT" disabled hidden>
                Select category
              </option>
              <option required value="Entertainment">
                Entertainment
              </option>
              <option required value="Food">
                Food
              </option>
              <option required value="Travel">
                Travel
              </option>
              <option required value="Others">
                Others
              </option>
            </select>
            <input
              placeholder="dd/mm/yyyy"
              type="date"
              id="date"
              name="date"
              required
              value={expenseFormValues.date}
              onChange={handleFormInputChange}
            ></input>
            <button type="submit">Done</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      )}
    </>
  );
}
export default AddExpenseForm;

{
  /* <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Expense</h2>
        <form onSubmit={handleExpenseSubmit}>
          <input
            name="title"
            placeholder="title"
            type="text"
            required
            value={expenseFormValues.title}
            onChange={handleFormInputChange}
          ></input>
          <input
            name="addedExpense"
            placeholder="price"
            type="number"
            required
            value={expenseFormValues.addedExpense}
            onChange={handleFormInputChange}
          ></input>
          <select
            name="category"
            id="category"
            required
            value={expenseFormValues.category}
            onChange={handleFormInputChange}
          >
            <option value="DEFAULT" disabled hidden>
              Select category
            </option>
            <option required value="Entertainment">
              Entertainment
            </option>
            <option required value="Food">
              Food
            </option>
            <option required value="Travel">
              Travel
            </option>
            <option required value="Others">
              Others
            </option>
          </select>
          <input
            placeholder="dd/mm/yyyy"
            type="date"
            id="date"
            name="date"
            required
            value={expenseFormValues.date}
            onChange={handleFormInputChange}
          ></input>
          <button type="submit">Add Expense</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </Modal> */
}
