import './GuestPopup.css'

export default function GuestPopup({setGuestPopup}){
    const handlePopupClick = () =>{
        setGuestPopup(false)
    }

    return  (
    <div className="guest-overlay">
        <div className="guest">
            <i className="fa-solid fa-xmark close-button" onClick={handlePopupClick}></i>
            <p className="title1 m-0">
                You need to login
            </p>
        </div>
    </div>
    )
}