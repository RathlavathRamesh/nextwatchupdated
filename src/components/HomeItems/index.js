import './index.css'
import {Component} from 'react'

class HomeItems extends Component {
  render() {
    const {item} = this.props
    console.log(item)
    return (
      <div className="recomdation-heading">
        <img src={item.thumbnail_url} alt="thubnail" className="thubnailUrl" />
      </div>
    )
  }
}

export default HomeItems
