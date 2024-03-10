import About from '@/components/about/About'
import TechStack from '@/components/techStack/TechStack'
import LandingPage from '@/components/LandingPage/LandingPage'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <About />
      <TechStack />
    </>
  )
}

export default HomePage