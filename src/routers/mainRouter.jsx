import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import PartyPage from "../routes/party/PartyPage";
import TransferPage from "../routes/transfer/TransferPage";
export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "/party",
        element: <PartyPage />,
      },
      {
        path: "/transfer",
        element: <TransferPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
