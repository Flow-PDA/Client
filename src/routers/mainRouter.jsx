import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import InterestPage from "../routes/Interest/InterestPage";
import PartyPage from "../routes/party/PartyPage";
import PartyCreatePage from "../routes/party/create/PartyCreatePage";
import TransferPage from "../routes/transfer/TransferPage";
import TransferDetailAccountNumPage from "../routes/transfer/TransferDetailAccountNumPage";
import TransferDetailPricePage from "../routes/transfer/TransferDetailPricePage";
import TransferDetailConfirmPage from "../routes/transfer/TransferDetailConfirmPage";

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
        path: "party",
        children: [
          {
            path: "",
            element: <PartyPage />,
            index: true,
          },
          {
            path: "create",
            element: <PartyCreatePage />,
            index: true,
          },
        ],
      },
      {
        path: "/transfer",
        children: [
          {
            path: "",
            element: <TransferPage />,
            index: true,
          },
          {
            path: "transferDetailAccountNumPage",
            element: <TransferDetailAccountNumPage />,
            index: true,
          },
          {
            path: "transferDetailPricePage",
            element: <TransferDetailPricePage />,
            index: true,
          },
          {
            path: "TransferDetailConfirmPage",
            element: <TransferDetailConfirmPage />,
            index: true,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
