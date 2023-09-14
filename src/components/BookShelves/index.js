import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Sidebar from '../Sidebar'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiConstraints = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    active: bookshelvesList[0].value,
    search: '',
    apiStatus: apiConstraints.initial,
    data: [],
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    const {search, active} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${active}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({apiStatus: apiConstraints.in_progress})
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        title: eachBook.title,
        readStatus: eachBook.read_status,
      }))
      this.setState({apiStatus: apiConstraints.success, data: updatedData})
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  onChangeSearchInput = e => {
    this.setState({search: e.target.value})
  }

  activeBook = value => {
    this.setState({active: value})
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {}

  renderFailureView = () => {}

  renderBooksInfo = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstraints.in_progress:
        return this.renderLoaderView()
      case apiConstraints.success:
        return this.renderSuccessView()
      case apiConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {search, active} = this.state
    this.getBooks()

    return (
      <>
        <Header />
        <div className="book-shelves-container">
          <div className="sidebar-container">
            <h4>Bookshelves</h4>
            <ul className="sidebar-list-container">
              {bookshelvesList.map(eachItem => (
                <Sidebar
                  eachItem={eachItem}
                  key={eachItem.id}
                  activeBook={this.activeBook}
                  isActive={eachItem.label === active}
                />
              ))}
            </ul>
          </div>
          <div className="books-container">
            <div className="heading-input-container">
              <h3>{active} Books</h3>
              <div className="search-container">
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  value={search}
                  placeholder="Search"
                />
              </div>
            </div>
            {this.renderBooksInfo()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default BookShelves
