import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import InterestPage from "../routes/Interest/InterestPage";
import PartyPage from "../routes/party/PartyPage";
import PartyCreatePage from "../routes/party/create/PartyCreatePage";
import MyPartyPage from "../routes/party/myparty/MyPartyPage"
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
          {
            path: "myparty",
            element: <MyPartyPage />,
            index: true,
          },
        ],
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
