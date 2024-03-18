import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import InterestPage from "../routes/Interest/InterestPage";
import PartyPage from "../routes/party/PartyPage";

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
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
