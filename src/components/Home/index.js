import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiSave, BiSearchAlt2} from 'react-icons/bi'
import Header from '../HeaderRoute'
import HomeItems from '../HomeItems'

class Home extends Component {
  state = {searchVal: '', dataReady: false, result: []}

  getsearchval = event => {
    this.setState({searchVal: event.target.value})
  }

  fetchData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchVal} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchVal}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`}, // provide headers, and Bearer exactly
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const ans = data.videos
    this.setState({dataReady: true, result: ans})
  }

  render() {
    const {dataReady, result} = this.state
    const size = result.length
    const isresultEmpty = size === 0
    console.log(isresultEmpty)
    return (
      <>
        <Header />
        <div className="HomeContainer">
          <div className="navCard">
            <div>
              <div className="section">
                <AiFillHome className="icon" />
                <p className="name">Home</p>
              </div>
              <div className="section">
                <FaFire className="icon" />
                <p className="name">Trending</p>
              </div>
              <div className="section">
                <SiYoutubegaming className="icon" />
                <p className="name">Gaming</p>
              </div>
              <div className="section">
                <BiSave className="icon" />
                <p className="name">Saved videos</p>
              </div>
            </div>
            <div>
              <h1 className="contact-heading">CONTACT US</h1>
              <div className="follow-us-Card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="follow-us-images"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="follow-us-images"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="follow-us-images"
                />
              </div>
              <h1 className="recomdation-heading">
                Enjoy! Now to see your <br />
                channels and <br /> recommendations!
              </h1>
            </div>
          </div>
          <div className="rightSide">
            <div className="imageCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="banner"
                className="banner-image"
              />
              <p className="plans-para">
                Buy Nxt Watch Premium prepaid plans with <br />
                UPI
              </p>
              <button type="button" className="getnowbtn">
                GET IT NOW
              </button>
            </div>
            <div className="searchline">
              <input
                type="text"
                className="searchinput"
                onChange={this.getsearchval}
                placeholder="Search"
              />
              <div className="searcIconCard">
                <BiSearchAlt2 className="searchicon" onClick={this.fetchData} />
              </div>
            </div>
            {dataReady && (
              <>
                {isresultEmpty && (
                  <div className="recomdation-heading">
                    Hii This is No Result Component
                  </div>
                )}
                {!isresultEmpty && (
                  <div className="searchCards">
                    {result.map(each => (
                      <HomeItems item={each} key={each.id} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default Home
