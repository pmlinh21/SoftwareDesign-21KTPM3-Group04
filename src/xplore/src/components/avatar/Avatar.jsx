import "./avatar.css";

function Avatar({ user }) {
    return (
        <div className="avatar-container">
            <img src={user.avatar || "../../assets/images/avatar1.png"} alt="user's avatar" className="avatar" />
        </div>
    )
}
