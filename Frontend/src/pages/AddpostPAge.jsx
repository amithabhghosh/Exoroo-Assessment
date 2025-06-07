import React from 'react'
import { AddPost } from '../Components/Addpost'
import { Navbar } from '../Components/Navbar'
import BackToTop from '../Components/BackToTop'

export const AddpostPAge = () => {
  return (
    <div>
        <Navbar/>
        <AddPost/>
        <BackToTop/>
    </div>
  )
}
