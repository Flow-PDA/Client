import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
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
        path: "/party",
        element: <PartyPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
