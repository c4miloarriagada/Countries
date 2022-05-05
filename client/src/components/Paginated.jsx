import React from 'react'
import styles from './Paginated.module.css'

const Paginated = ({ countriesPerPage, allCountries, paginated }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <nav className={styles.pages}>
            <ul className={styles.paginated}>
                { pageNumbers?.map(number => (
                        <li className={styles.numbers} key={number}>

                            <button onClick={() => paginated(number)} className={styles.number}>{number}</button>

                        </li>
                    ))}
            </ul>
        </nav>
    )

}

export default Paginated