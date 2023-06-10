import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

class RestaurantsDetails extends Component {
  state = {
    foodItemList: [],
    cartList: [],
    isLoading: false,
    restaurantsDetails: {},
  }

  componentDidMount() {
    this.getRestaurantsDetails()
  }

  getRestaurantsDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updateData = {
        name: data.name,
        location: data.location,
        rating: data.rating,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodList = data.food_items.map(each => ({
        cost: each.cost,
        name: each.name,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
      }))
      this.setState({
        foodItemList: updatedFoodList,
        restaurantsDetails: updateData,
        isLoading: false,
      })
    }
  }

  addToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodObject = cartList.find(eachFood => eachFood.id === foodItem.id)

    if (foodItem.quantity !== 0) {
      if (foodObject) {
        this.setState(
          prevState => ({
            cartList: prevState.cartList.map(eachFood => {
              if (foodObject.id === eachFood.id) {
                return {...foodItem}
              }
              return eachFood
            }),
          }),
          this.addToLocalStorage,
        )
      } else {
        const updatedCartList = [...cartList, foodItem]

        this.setState({cartList: updatedCartList}, this.addToLocalStorage)
      }
    } else {
      this.removeCartItem(foodItem.id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)

    this.setState({cartList: updatedCartList}, this.addToLocalStorage)
  }

  renderLoaderView = () => (
    <div data-testid="restaurant-details-loader" className="home-loader">
      <Loader type="TailSpin" color="#F7931E" size={50} width={50} />
    </div>
  )

  renderDetailRestaurantsView = () => {
    const {restaurantsDetails, foodItemList, cartList} = this.state
    console.log(cartList)
    const {
      name,
      location,
      rating,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
    } = restaurantsDetails

    return (
      <div className="restaurants-details-main-container">
        <div className="restaurants-details-card-view">
          <img
            src={imageUrl}
            className="restaurants-details-image"
            alt="restaurant"
          />
          <div>
            <div>
              <h1 className="restaurants-details-name">{name}</h1>
              <p className="restaurants-details-location">{cuisine}</p>
              <p className="restaurants-details-location">{location}</p>
            </div>
            <div className="restaurants-rating-cost-container">
              <div>
                <div className="details-icon-card-container">
                  <AiFillStar className="restaurants-details-icon" />
                  <p className="restaurants-detail-rating">{rating}</p>
                </div>

                <p className="restaurants-small-heading">
                  {reviewsCount}+Ratings
                </p>
              </div>
              <hr className="details-line" />
              <div>
                <div className="details-icon-card-container">
                  <BiRupee className="restaurants-details-icon" />
                  <p className="cost-for-two">{costForTwo}</p>
                </div>
                <p className="restaurants-small-heading">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-item-ul-container">
          {foodItemList.map(each => (
            <FoodItem
              key={each.id}
              foodDetails={each}
              addCartItem={this.addCartItem}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading
          ? this.renderLoaderView()
          : this.renderDetailRestaurantsView()}
      </>
    )
  }
}

export default RestaurantsDetails
