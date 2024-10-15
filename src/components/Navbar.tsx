import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate();

    return(
        <header>
            <img onClick={() => navigate('/')} src="#" alt="logo" />
            <h2>Simple Projects</h2>
            <div className="nav-options">
                <button
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
                <button
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </header>
    )
}