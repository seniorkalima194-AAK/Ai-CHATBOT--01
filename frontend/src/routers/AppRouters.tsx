import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/aunthentication/Login'
import Signup from '../pages/aunthentication/Signup'
import ChatPage from '../pages/main/ChatPage'
import DateOfBirth from '../pages/aunthentication/DateOfBirth'
import ProfilePage from '../pages/main/ProfilePage'
import NotificationPage from '../pages/main/NotificationPage'

const AppRouters = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login />}  />
            <Route path='/signup' element={<Signup />}  />
            <Route path='/date-of-birth' element={<DateOfBirth />}  />
            <Route path='/chat' element={<ChatPage />}  />
            <Route path='/profile' element={<ProfilePage />}  />
            <Route path='/notification' element={<NotificationPage/>}  />
        </Routes>
    </div>
  )
}

export default AppRouters