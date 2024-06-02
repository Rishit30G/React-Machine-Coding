import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../theme-context'

const NavBar = () => {

  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <nav className='navbar'>
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
        </div>
        <div className='mode-switch'>
          <label>
            <input type='checkbox' onChange={toggleTheme} checked={theme === 'dark'}></input>
            <span className='slider round'></span>
          </label>
        </div>
    </nav>
  )
}

export default NavBar