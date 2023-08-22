import { Link } from 'react-router-dom'
import './HeaderComponent.css'

export const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <Link to={'/'}>
            <p>Postify</p>          
          </Link>          
        </div>
      </div>
    </header>
  )
}