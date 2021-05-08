import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function UnauthenticatedLayout(): JSX.Element {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-catskill-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-full">
        <main>
          <Outlet />
        </main>
        <div className="flex justify-center mt-3 text-gray-600">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Offerzen (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
