import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Context from "./context/context";

const id = document.getElementById("root");
const root = createRoot(id);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Context />
    </ChakraProvider>
  </BrowserRouter>
);
