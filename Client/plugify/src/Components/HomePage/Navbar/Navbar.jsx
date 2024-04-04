import './Navbar.css'
import logo from '../../../assets/logo.png'

const Navbar = () => {
    return(
        <nav className='nav'>
            <div className="nav-logo"><img src={logo} alt="" /></div>
            <ul className='nav-menu'>
                <li>Home</li>
                <li>Explore</li>
                <li>About</li>
                <li className='nav-contact'>Contact</li>
            </ul>
        </nav>


    )
}

export default Navbar