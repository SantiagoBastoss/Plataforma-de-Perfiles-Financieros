import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = ()=>{
    return <>
        <header className="header">
            <nav className="nav">
                <NavLink to="/persona/perfil" className="nav__logo">
                    PPF
                </NavLink>

                <div className={"nav__menu"} id="nav-menu">
                    
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/persona/informacion-personal" className="nav__link">
                                Información Personal
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/persona/productos-financieros" className="nav__link">
                                Productos Financieros
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/persona/historial-de-reportes" className="nav__link">
                                Historial de Reportes
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/persona/notificaciones" className="nav__link">
                                Notificaciones
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