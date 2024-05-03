import './Loading.css'

export default function Loading({type}){
    if (type && type == "full"){
        return (
            <div className="login-popup-overlay">
                <p className="p1 text-scheme-sub-text loading text-center ">Loading...</p>
            </div>
        )
    }
    return (
        <div className="loading-container col-12 d-flex align-items-center justify-content-center">
            <p className="p1 text-scheme-sub-text loading text-center ">Loading...</p>
        </div>
    )
}