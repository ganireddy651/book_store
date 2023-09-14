import Slider from 'react-slick'

const Slick = props => {
  const {eachItem} = props

  const settings = {
    dots: true,
    infinite: true,
    accessibility: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div>
      <Slider {...settings}>
        <div style={{display: 'flex'}}>
          <img className="logo-image" src={eachItem.coverPic} alt="cover pic" />
          <h6>{eachItem.title}</h6>
          <p>{eachItem.authorName}</p>
        </div>
      </Slider>
    </div>
  )
}

export default Slick
