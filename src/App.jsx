import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './App.module.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'

function App() {

  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <div className={style.logoDisplay}>
          <FontAwesomeIcon icon={faCartShopping} className={style.cartIcon} /><h1 className={style.logoText}>SHOPPING</h1>
        </div>
        <div className={style.navSection}>
          <h2 className={style.tabs}>Home</h2>
          <h2 className={style.tabs}>About</h2>
          <Link to="services" className={style.link}><h2>Shop</h2></Link>
          <h2 className={style.tabs}>Contact</h2>
        </div>
      </div>
      <div className={style.main}>
        <div>
          <h1>ONLINE</h1>
          <h1>SHOPPING</h1>
        </div>
        <div>
          <p>Discover great deals and shop with confidence. <br />Fast delivery, secure checkout,
            and curated products for your lifestyle.</p>
        </div>
        <button>READ MORE</button>
      </div>
    </div>
  )
}

export default App
