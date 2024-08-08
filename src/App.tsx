import { CssBaseline } from "@mui/material";
import "./App.css";
import MainPage from "./components/main-page/main-page";
import { SnackbarProvider } from "./context/snackbar-context";

function App() {
  return (
    <>
      <SnackbarProvider>
        <CssBaseline />
        <MainPage />
      </SnackbarProvider>
    </>
  );
}

export default App;
