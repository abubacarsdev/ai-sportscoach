import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomTabNav from "./BottomTabNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomTabNav />
    </div>
  );
}
