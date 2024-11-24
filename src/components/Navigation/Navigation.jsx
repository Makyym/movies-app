import clsx from "clsx";
import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"

const activeLink = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
    return (
        <div>
            <nav className={s.nav}>
                <NavLink to="/" className={activeLink}>
                    Home
                    </NavLink>
                    <NavLink to="/movies" className={activeLink}>
                    Movies
                </NavLink>
            </nav>
        </div>
    )
}

export default Navigation