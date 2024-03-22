import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import InterestPage from "../routes/Interest/InterestPage";
import PartyPage from "../routes/party/PartyPage";
import PartyCreatePage from "../routes/party/create/PartyCreatePage";
import MyPartyPage from "../routes/party/myparty/MyPartyPage";
import PartyInfoPage from "../routes/party/info/PartyInfoPage";
import PartyInvitePage from "../routes/party/invite/PartyInvitePage";
import TransferPage from "../routes/transfer/TransferPage";
import SetGoalPage from "../routes/party/setgoal/SetGoalPage";
import SetPricePage from "../routes/party/setprice/SetPricePage";
import SetDatePage from "../routes/party/setdate/SetDatePage";
import SignupPage from "../routes/signup/SignupPage";
import LoginPage from "../routes/login/LoginPage";
import LiveStockPage from "../routes/invest/livestock/LiveStockPage";
import MarketStockPage from "../routes/invest/market/MarketStockpage";
import RisingStockPage from "../routes/invest/rising/RisingStockPage";
import StrategyStockPage from "../routes/invest/strategy/StrategyStockPage";

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
        element: <TransferPage />,
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
