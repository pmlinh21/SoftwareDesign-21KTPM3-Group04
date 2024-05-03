import './NotFound.css'
import { useNavigate, Link } from 'react-router-dom'

export default function NotFound({type}){
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/home");
    };
    return (
        <div className="not-found-container col-12 d-flex flex-column gap-4 align-items-center justify-content-center">
            <p className='subtitle1' style={{ color: 'var(--scheme-primary)', textAlign: 'center' }}>404 ERROR</p>
            <h1>404</h1>
            <p className='text-center p1' style={{  width: '20%'}}>Sorry, the page you are looking for doesn't exist. Here are what you can do:</p>
            <button onClick={handleNavigateHome} className='prim-btn btn-md' style={{ width: '200px'}}>Back to Home</button>
        </div>
    )
}