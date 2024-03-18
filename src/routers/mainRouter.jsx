import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import MainPage from "../routes/MainPage";
export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
