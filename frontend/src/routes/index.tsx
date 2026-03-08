import React, {lazy, Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "lucide-react";
import AppLayout from "../layout";

const LoadComponent = (Component: React.ElementType) => {
  return () => (
    <Suspense fallback={<div className="flex items-center justify-center h-full w-full"><Loader className="animate-spin" /></div>}>
      <Component />
    </Suspense>
  );
};

const Home = LoadComponent(lazy(() => import("../pages/home")));
const Profile = LoadComponent(lazy(() => import("../pages/profile")));

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
