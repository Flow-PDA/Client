import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
import PartyPage from "../routes/party/PartyPage";
import PartyCreatePage from "../routes/party/create/PartyCreatePage";
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
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
