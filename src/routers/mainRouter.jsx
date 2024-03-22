import { createBrowserRouter } from "react-router-dom";

import MainPage from "../routes/MainPage";
import InterestPage from "../routes/interest/InterestPage";
import PartyPage from "../routes/party/PartyPage";
import PartyCreatePage from "../routes/party/create/PartyCreatePage";
import MyPartyPage from "../routes/party/myparty/MyPartyPage";
import PartyInfoPage from "../routes/party/info/PartyInfoPage";
import PartyInvitePage from "../routes/party/invite/PartyInvitePage";
import TransferPage from "../routes/transfer/TransferPage";
import TransferDetailAccountNumPage from "../routes/transfer/TransferDetailAccountNumPage";
import TransferDetailPricePage from "../routes/transfer/TransferDetailPricePage";
import TransferDetailConfirmPage from "../routes/transfer/TransferDetailConfirmPage";
import SetGoalPage from "../routes/party/setgoal/SetGoalPage";
import SetPricePage from "../routes/party/setprice/SetPricePage";
import SetDatePage from "../routes/party/setdate/SetDatePage";
import SignupPage from "../routes/signup/SignupPage";
import LoginPage from "../routes/login/LoginPage";
import MyPartyTransactionDetail from "../routes/party/mypartytransaction/MyPartyTransactionDetail";
import LiveStockPage from "../routes/invest/livestock/LiveStockPage";
import { ProtectedLayout } from "../routes/ProtectedLayout";
import InterestStockDetailChartPage from "../routes/interest/intereststock/chart/InterestStockDetailChartPage";


export const mainRouter = [
  {
    path: "",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "interests",
        children: [
          {
            path: "",
            element: <InterestPage />,
            index: true,
          },
          {
            path: "stock",
            element: <InterestStockDetailChartPage />,
            index: true,
          },
        ],
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
          {
            path: "myPartyTransactionDetail",
            element: <MyPartyTransactionDetail />,
            index: true,
          },
          {
            path: "info",
            children: [
              {
                path: "",
                element: <PartyInfoPage />,
                index: true,
              },
              {
                path: "invite",
                element: <PartyInvitePage />,
                index: true,
              },
              {
                path: "setgoal",
                element: <SetGoalPage />,
                index: true,
              },
              {
                path: "setprice",
                element: <SetPricePage />,
                index: true,
              },
              {
                path: "setdate",
                element: <SetDatePage />,
                index: true,
              },
            ],
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
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "livestock",
        element: <LiveStockPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
