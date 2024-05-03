import './Paywall.css'
import { useNavigate, Link } from 'react-router-dom'

export default function Paywall({type}){
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/home");
    };
    const handleNavigatePricing = () => {
        navigate("/pricing");
    };
    return (
        <div className="paywall-container col-12 d-flex flex-column align-items-center justify-content-center">
            <i></i><p className='title2'>Member Only Content</p>
            <p>We're sorry to announce that only members can gain access to this type of content on Xplore. Please upgrade your Membership to discover more. </p>
            <div className='d-flex flex-row gap-2'>
                <button onClick={handleNavigateHome} className='tert-btn btn-md' style={{ width: '200px'}}>Back to Home</button>
                <button onClick={handleNavigatePricing} className='prim-btn btn-md' style={{ width: '200px'}}>Upgrade now</button>
            </div>
            
        </div>
    )
}