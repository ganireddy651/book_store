import './index.css'

const Sidebar = props => {
  const {eachItem, isActive, activeBook} = props
  const {value, label} = eachItem

  const onDifferentBook = () => {
    activeBook(value)
  }

  return (
    <li>
      <button type="button" onClick={onDifferentBook}>
        {label}
      </button>
    </li>
  )
}

export default Sidebar
