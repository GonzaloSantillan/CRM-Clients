import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    const clasesLink = "text-2xl block hover:text-blue-400 text-white";
    const clasesLinkActivo = "text-2xl block text-blue-400 underline";

    return ( 
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">CRM - Clients</h2>
                <nav className="m-5">
                    <NavLink className={({isActive})=>isActive?clasesLinkActivo:clasesLink} to='/'>Clients</NavLink>
                    <NavLink className={({isActive})=>isActive?clasesLinkActivo:clasesLink} to='/client/new'>New Client</NavLink>
                </nav>
            </aside>
            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet/>
            </div>
        </div>
    );
}
 
export default Layout;