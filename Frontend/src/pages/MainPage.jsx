import React from 'react'
import { Navbar } from '../Components/Navbar'
import { PostFeed } from '../Components/PostFeed'
import BackToTop from '../Components/BackToTop'

export const MainPage = () => {
  return (
    <div>
        <Navbar/>
        <PostFeed/>
        <BackToTop/>
    </div>
  )
}
