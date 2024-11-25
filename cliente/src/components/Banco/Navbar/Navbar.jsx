import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ()=>{
    return <>
        <header className="header">
            <nav className="nav">
                <NavLink to="/banco" className="nav__logo">
                    PPF
                </NavLink>

                <div className={"nav__menu"} id="nav-menu">
                    
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/banco/generar-zkp" className="nav__link">
                                Generar ZKP
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/banco/reportar-cliente" className="nav__link">
                                Reportar cliente
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/banco/nuevo-cliente" className="nav__link">
                                Agregar Cliente
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/banco/nuevo-producto" className="nav__link">
                                Agregar Productos
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/" className="nav__link">
                                Salir
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </>
}
export default Navbar;