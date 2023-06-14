import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import Header from '../Header'
import RestaurantCard from '../RestaurantCard'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carouselImages: [],
    carouselLoading: false,
    restaurantsList: [],
    isLoading: false,
    activePage: 1,
    activeOptionValue: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getCarouselImageData()
    this.getAllRestaurantsDetails()
  }

  onChangeOptionValue = event => {
    this.setState(
      {activeOptionValue: event.target.value},
      this.getAllRestaurantsDetails,
    )
  }

  onClickLeftPagination = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getAllRestaurantsDetails,
      )
    }
  }

  onClickRightPagination = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getAllRestaurantsDetails,
      )
    }
  }

  getAllRestaurantsDetails = async () => {
    this.setState({isLoading: true})
    const {activeOptionValue, activePage} = this.state
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${activeOptionValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(each => ({
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
        name: each.name,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
      }))
      console.log(updatedData)
      this.setState({isLoading: false, restaurantsList: updatedData})
    }
  }

  getCarouselImageData = async () => {
    this.setState({carouselLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({carouselImages: updatedData, carouselLoading: false})
    }
  }

  renderLoaderView = () => (
    <div data-testid="restaurants-list-loader" className="home-loader">
      <Loader type="TailSpin" color="#F7931E" size={50} width={50} />
    </div>
  )

  renderOfferLoaderView = () => (
    <div data-testid="restaurants-offers-loader" className="offer-loader">
      <Loader type="TailSpin" color="#F7931E" size={50} width={50} />
    </div>
  )

  renderSliderView = () => {
    const {carouselImages} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {carouselImages.map(each => (
          <div className="carousel-container" key={each.id}>
            <img className="carousel-image" src={each.imageUrl} alt="offer" />
          </div>
        ))}
      </Slider>
    )
  }

  renderRestaurantsDetails = () => {
    const {
      activeOptionValue,
      carouselLoading,
      activePage,
      restaurantsList,
    } = this.state

    return (
      <div className="home-container">
        <div className="home-response-container">
          {carouselLoading
            ? this.renderOfferLoaderView()
            : this.renderSliderView()}
          <div className="home-inner-container">
            <h1 className="home-heading">Popular Restaurants</h1>
            <div className="home-sort-by-para">
              <p className="home-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="filter-container">
                <BsFilterLeft size={26} color="#475569" />
                <p className="sort-by">Sort by</p>
                <select
                  className="select-option"
                  onChange={this.onChangeOptionValue}
                  value={activeOptionValue}
                >
                  {sortByOptions.map(each => (
                    <option key={each.id} value={each.value}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="home-line" />
            <ul className="restaurants-ul-container">
              {restaurantsList.map(each => (
                <RestaurantCard key={each.id} restaurantDetails={each} />
              ))}
            </ul>
            <div className="pagination-container">
              <button
                data-testid="pagination-left-button"
                type="button"
                className="pagination-btn"
                onClick={this.onClickLeftPagination}
              >
                <AiOutlineLeft className="pagination-icon" />
              </button>
              <p className="active-page-number">
                <span data-testid="active-page-number">{activePage}</span> of 4
              </p>
              <button
                data-testid="pagination-right-button"
                type="button"
                className="pagination-btn"
                onClick={this.onClickRightPagination}
              >
                <AiOutlineRight className="pagination-icon" />
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        {isLoading ? this.renderLoaderView() : this.renderRestaurantsDetails()}
      </>
    )
  }
}

export default Home
