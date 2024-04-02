import { RouterProvider } from "react-router-dom";
import router from "./routes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
