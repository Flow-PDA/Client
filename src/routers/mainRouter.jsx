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
            ],
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
