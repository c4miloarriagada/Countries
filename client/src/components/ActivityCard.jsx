import React from 'react'
import styles from './Activity.module.css'


const ActivityCard = (activity) => {
  return (
    <div>
        {activity && (
            <div className={styles.activity}>
            
            <p><b>Activity : </b>{activity.name}</p>
            <p><b>Difficult : </b>{activity.difficult}</p>
            <p><strong>Duration : </strong>{activity.duration} Horas</p>
            <p><strong>Season : </strong>{activity.season}</p>
            
            </div>

        )}
    </div>
  )
}

export default ActivityCard