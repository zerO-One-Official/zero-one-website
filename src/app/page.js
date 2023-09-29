import HomeAbout from '@/components/homeAbout/HomeAbout'
import TechStack from '@/components/techStack/TechStack'
import LandingPage from '@/components/LandingPage/LandingPage'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <HomeAbout />
      <TechStack />
    </>
  )
}

export default HomePage