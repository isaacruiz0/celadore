import { useState } from 'react'
import './styles.css'

export default function NavBar() {
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const handleClick = (buttonType: string) => {
    setClickedButton(buttonType)

    setTimeout(() => {
      setTimeout(() => setClickedButton(null), 1000)
    }, 400)
  }

  return (
    <nav className="navbar-glass">
      <button
        onClick={() => handleClick('Sign In')}
        className={`nav-button ${clickedButton === 'Sign In' ? 'clicked' : ''}`}
        disabled={clickedButton === 'Sign In'}
      >
        Sign In
      </button>
      <button
        onClick={() => handleClick('Sign Up')}
        className={`nav-button nav-button-primary ${clickedButton === 'Sign Up' ? 'clicked' : ''}`}
        disabled={clickedButton === 'Sign Up'}
      >
        Sign Up
      </button>
    </nav>
  )
}
