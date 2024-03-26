import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Views/HomeView";
import NotFoundPage from "./Views/NotFoundView";
import Login from "./Views/LoginView";
import ProfileView from "./Views/ProfileView";
import HistoryView from "./Views/HistoryView";
import RegisterView from "./Views/RegisterView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/history",
    element: <HistoryView />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
