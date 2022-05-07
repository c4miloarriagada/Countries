import React from 'react'
import { Link } from 'react-router-dom'
import Linkedin from '../assets/Linkedin.png'
import Octocat from '../assets/Octocat.png'
import style from './About.module.css'

const About = () => {
  return (
    <div className={style.page}>
      <div className={style.nav}>
      <li className={style.li}><Link to='/home'> Go Home</Link> </li>
      </div>
      <div className={style.container}> 
      <h1 className={style.h1}>About</h1>
      <p className={style.p}><strong>Hi!, I'm Camilo from Chile and this is my personal project for Henry bootcamp!. I made all parts of this website, the Back end with Node JS, Express JS and Sequelize, and  Front end with React JS, Redux and CSS </strong></p>
      <p className={style.p}><strong>If you want to contact me, links below!</strong></p>
      <a 
            rel='noreferrer'
            href='https://www.linkedin.com/in/camilo-arriagada-vallejos-9754b9229/'
            target="_blank"
            
          >
            <img alt="linkedin" src={Linkedin} width='300px' height='200px'/>
          </a>
          <a
            rel='noreferrer'
            href='https://github.com/c4miloarriagada/'
            target="_blank"
            
          >
            <img alt="github" src={Octocat} width='300px' height='200px'/>
          </a>

      </div>
    </div>
  
  )
}

export default About