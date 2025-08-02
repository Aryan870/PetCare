import React from 'react'
import Header from '../components/Header'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import SpecialityMenu from '../components/SpecialityMenu'
import PetServices from '../components/PetServices'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <PetServices />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
