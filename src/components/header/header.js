import './header.css';

function Header() {
  return (
    <header>
        <div class="nav-container">
            <img src="images/logo.png" alt="Infosys Springboard Logo" class="logo"/>
            <nav>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Focus Areas & Skills</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}

export default Header;
