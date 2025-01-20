import { NavbarComponent } from "@/components/navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <nav className="fixed w-full top-0">
        <NavbarComponent></NavbarComponent>
      </nav>
      <div className="pt-16 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
