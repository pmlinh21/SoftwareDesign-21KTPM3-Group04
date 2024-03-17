import "./author-card.css";

function AuthorCard({ author }) {
  return (
    <div class="author-card">
        <img src={author.photo || "../../assets/images/photo-placeholder.jpg"} alt="user's photo" class="author-card__photo" />
        <div class="author-card__info">
            <div class="author-card__info__name title1">{author.name}</div>
            <div class="author-card__info__bio p3">{author.bio}</div>
            <span class="author-card__info__tags">
                {author.tags.map(tag => <div class="author-card__info__tag support">{tag}</div>)}
            </span>
        </div>
    </div>
  )
}