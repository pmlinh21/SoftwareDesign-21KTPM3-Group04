import "./author-card.css";

function AuthorCard({ user }) {
  return (
    <div className="author-card">
        <img src={user.photo || "../../assets/images/photo-placeholder.jpg"} alt="user's photo" className="author-card__photo" />
        <div className="author-card__info">
            <div className="author-card__info__name title1">{user.name}</div>
            <div className="author-card__info__bio p3">{user.bio}</div>
            <span className="author-card__info__tags">
                {user.tags.map(tag => <div className="author-card__info__tag support">{tag}</div>)}
            </span>
        </div>
    </div>
  )
}