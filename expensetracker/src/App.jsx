import ExpenseTracker from "./MainPage/ExpenseTracker";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <ExpenseTracker />
    </SnackbarProvider>
  );
}

export default App;
