import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="min-w-[20rem] max-w-480 mx-auto ">
      <ToastContainer />
      <Header />
      <div className="flex w-full">
        <Nav />
        <div className="antialiased w-full min-h-svh flex flex-col bg-soft-white pl-[7rem] sm:pl-[10rem] ">
          <main className="w-full p-6 sm:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;