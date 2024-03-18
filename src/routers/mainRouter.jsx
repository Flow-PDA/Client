import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import InterestPage from "../routes/Interest/InterestPage";
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
        path: "/interests",
        element: <InterestPage />,
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
