import NavigationLink from "../navigationLink";
import { Search } from "lucide-react";

const Sidebar = () => {
    return (
        <nav className="w-[24rem] h-full p-4 border-r border-default-border">
            <div className="flex flex-col gap-1 mb-4">
                {/* User search */}
                <div className="w-full mb-1 text-sm rounded-md bg-secondary-muted text-primary-100 transition-colors duration-200 border border-muted-border focus-within:border-default-border flex items-center px-2 py-2">
                    <Search className="text-muted-border mr-2" />
                    <input
                        type="text"
                        placeholder="Search users"
                        className="flex-1 bg-transparent focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <NavigationLink to="/" label="Gitdos" />
                    <NavigationLink to="/profile" label="Profile" />
                </div>
            </div>
        </nav>
    );
};


export default Sidebar;