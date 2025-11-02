import { BASE_URL } from '../../api'
import styles from './HomeCard.module.css'
import { Link } from 'react-router-dom'

const HomeCard = ({product}) => {
  return (
    <div className={`col-12 col-sm-6 col-md-4 col-lg-3 ${styles.cardWrapper}`}>
    <Link to={`/product_detail/${product.slug}`} className={styles.link}>
    <div className={styles.card}>
        <div className={styles.cardImgWrapper}>
            <img src={`${BASE_URL}${product.image}`}
                className={styles.cardImgTop}
                alt='Product-Image'/>
        </div>

    <div className={styles.cardBody}>
        <h5 className={`${styles.cardTitle} mb-1`}>{product.name}</h5>
        <h6 className={styles.cardText}>{`$${product.price}`}</h6>
    </div>    

    </div>
    </Link>


    </div>
  )
}

export default HomeCard