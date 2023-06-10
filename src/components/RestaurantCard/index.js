import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, id, cuisine, rating, totalReviews} = restaurantDetails

  return (
    <Link
      testid="restaurant-item"
      className="restaurant-link"
      to={`/restaurant/${id}`}
    >
      <li className="restaurant-card">
        <img className="restaurant-image" src={imageUrl} alt="restaurant" />
        <div className="restaurant-name-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine-name">{cuisine}</p>
          <div className="restaurant-rating-container">
            <AiFillStar className="rating-star" color="#FFCC00" />
            <p className="rating">{rating}</p>
            <h1 className="reviews">({totalReviews})</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
