import ExpenseTracker from "./MainPage/ExpenseTracker";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <ExpenseTracker />
      {/* <Modal isOpen={true} /> */}
    </SnackbarProvider>
  );
}

export default App;
