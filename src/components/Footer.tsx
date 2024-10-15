import { useNavigate } from "react-router-dom"

export const Footer = () => {
    const navigate = useNavigate();

    return(
        <footer>
            <img onClick={() => navigate('/')} src="#" alt="logo" />
            <div className="footer-social-media">

            </div>
            <h3>Copyright &copy; 2024 Leonardo Luz</h3>
       </footer>
    )
}