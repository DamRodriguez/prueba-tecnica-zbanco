import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";
import ReduxStoreProvider from "../components/provider/ReduxStoreProvider";

const MainLayout = () => {
  return (
    <ReduxStoreProvider>
      <ToastContainer />
      <div className="min-w-[20rem] max-w-480 mx-auto ">
        <Header />
        <div className="flex w-full">
          <Nav />
          <div className="antialiased w-full min-h-svh flex flex-col bg-opaque-gray/25 pl-[4rem] sm:pl-[10rem] ">
            <main className="w-full p-4 sm:p-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ReduxStoreProvider>
  );
};

export default MainLayout;