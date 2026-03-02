import { Outlet} from "react-router-dom";
import Sidebar from "../components/sidebar";

const AppLayout = () => {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <nav className="bg-main-muted text-white p-4 flex items-center justify-between border-b border-default-border">
                <h1 className="text-2xl font-bold">Gitdos</h1>
            </nav>
            <main className="flex bg-main w-full">
                <Sidebar/>
                <div className="h-[calc(100vh-4rem)] w-full">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default AppLayout;