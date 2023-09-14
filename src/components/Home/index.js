import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Slick from '../Slick'
import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstraints.initial,
    data: null,
  })

  useEffect(() => {
    const getTopRatedBooks = async () => {
      const token = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
      const options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      setApiStatus({status: apiConstraints.in_progress, data: null})
      const response = await fetch(url, options)
      const fetchedData = await response.json()
      if (response.ok === true) {
        const updatedData = fetchedData.books.map(each => ({
          coverPic: each.cover_pic,
          authorName: each.author_name,
          title: each.title,
          id: each.id,
        }))
        setApiStatus({status: apiConstraints.success, data: updatedData})
      } else {
        setApiStatus({status: apiConstraints.failure})
      }
    }
    getTopRatedBooks()
  }, [])

  const renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiStatus

    return (
      <div className="top-rated-books-container">
        <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
        <p className="home-page-description">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="sick-container">
          <div className="slick-top-section">
            <h1 className="top-rated">Top Rated Books</h1>
            <button type="button" className="find-books">
              Find Books
            </button>
          </div>
          {/* <ul className="slick-list-container">
            {data.map(eachItem => (
              <Slick eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul> */}
          {/* <Slick data={data} /> */}
        </div>
      </div>
    )
  }

  const renderFailureView = () => {}

  const renderTopRankedBooks = () => {
    const {status} = apiStatus
    switch (status) {
      case apiConstraints.in_progress:
        return renderLoaderView()
      case apiConstraints.success:
        return renderSuccessView()
      case apiConstraints.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="home-container">
        {renderTopRankedBooks()}
        <Footer />
      </div>
    </>
  )
}

export default Home
