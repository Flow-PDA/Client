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
import MarketStockPage from "../routes/invest/market/MarketStockpage";
import RisingStockPage from "../routes/invest/rising/RisingStockPage";
import StrategyStockPage from "../routes/invest/strategy/StrategyStockPage";
import { ProtectedLayout } from "../routes/ProtectedLayout";
import InterestStockDetailChartPage from "../routes/interest/intereststock/chart/InterestStockDetailChartPage";
import InterestStockDetailAskingPricePage from "../routes/interest/intereststock/askingPrice/InterestStockDetailAskingPricePage";

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
        ],
      },
      {
        path: "stockDetail/:partyKey/:stockKey",
        children: [
          {
            path: "chart",
            element: <InterestStockDetailChartPage />,
          },
          // 호가, 뉴스 추가할 것
          {
            path: "askingPrice",
            element: <InterestStockDetailAskingPricePage />,
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
            path: ":partyKey/myparty",
            element: <MyPartyPage />,
            index: true,
          },
          {
            path: ":partyKey/myPartyTransactionDetail",
            element: <MyPartyTransactionDetail />,
            index: true,
          },
          {
            path: ":partyKey/info",
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
        path: "transfer",
        children: [
          {
            path: ":partyKey/",
            element: <TransferPage />,
            index: true,
          },
          {
            path: ":partyKey/transferDetailAccountNumPage",
            element: <TransferDetailAccountNumPage />,
            index: true,
          },
          {
            path: ":partyKey/transferDetailPricePage",
            element: <TransferDetailPricePage />,
            index: true,
          },
          {
            path: ":partyKey/TransferDetailConfirmPage",
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
        path: "livestock/:partyKey",
        element: <LiveStockPage />,
      },
      {
        path: "risingstock",
        element: <RisingStockPage />,
      },
      {
        path: "strategystock",
        element: <StrategyStockPage />,
      },
      {
        path: "marketstock",
        element: <MarketStockPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
