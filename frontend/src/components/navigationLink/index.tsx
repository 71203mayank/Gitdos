import { NavLink } from "react-router-dom";
import {twMerge} from "tailwind-merge";

type NavigationLinkProps = {
    to: string;
    label: string;
};

const NavigationLink = ({ to, label}: NavigationLinkProps) => {
    return (
        <NavLink to={to} className={({isActive}) => twMerge("w-full px-2 py-1 rounded-md text-base font-medium hover:bg-primary-200 text-primary-100 transition-colors duration-200", 
            isActive ? "bg-primary-200" : "bg-transparent"
        )} end>
            {label}
        </NavLink>
    );
}

export default NavigationLink;