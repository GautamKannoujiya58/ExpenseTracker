import Modal from "react-modal";
function ModalForm({
  modalIsOpen,
  closeModal,
  buttonId,
  handleBalanceSubmit,
  addedBalance,
  //   lsldflaslaslasdk
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
  console.log("ButttonId >>>>", buttonId);
  console.log("Title >>>>>", title);
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
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Add Expense</h2>
          <form onSubmit={handleExpenseSubmit}>
            <input
              placeholder="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              placeholder="price"
              type="number"
              required
              value={addedExpense}
              onChange={(e) => setAddedExpense(e.target.value)}
            ></input>
            <select
              name="category"
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <button type="submit">Add Expense</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      )}
    </>
  );
}
export default ModalForm;
