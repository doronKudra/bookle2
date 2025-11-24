const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header-container">
            <section className="app-header">
                <img className='logo' src="./assets/img/bookle-logo.jpg"/>
                <nav className="nav-bar">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}
