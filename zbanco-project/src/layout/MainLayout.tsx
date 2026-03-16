import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="antialiased min-h-svh flex flex-col bg-soft-gray">
      <main className="min-w-[20rem] max-w-480 mx-auto w-full font-poppins">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;