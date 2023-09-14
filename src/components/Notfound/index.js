import './index.css'

const Notfound = props => {
  const onBackToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595836/Group_7484_oew98o.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <button
        type="button"
        className="go-back-home-button"
        onClick={onBackToHome}
      >
        Go Back to Home
      </button>
    </div>
  )
}

export default Notfound
