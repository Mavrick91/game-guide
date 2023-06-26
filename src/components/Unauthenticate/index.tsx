import { Outlet } from "react-router-dom";

const Unauthenticate = () => {
  return (
    <main className="h-full p-12">
      <Outlet />
    </main>
  );
};

export default Unauthenticate;
