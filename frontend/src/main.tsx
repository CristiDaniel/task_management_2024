import { StrictMode } from "react";
import * as ReactDOMClient from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Homepage from "./Pages/Homepage";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "*",
        element: "Ruta nu a fost gasita",
      },
    ],
  },
]);

const AppWrapper = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        theme="dark"
        position="bottom-left"
        autoClose={2000}
        transition={Zoom}
      />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
if (process.env.NODE_ENV !== "test") {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOMClient.createRoot(document.getElementById("root")!);

  root.render(<AppWrapper />);
}
