import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/GigIndex.jsx'

import { GigDetails } from './pages/GigDetails.jsx'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { Login } from './cmps/Login.jsx'
import { Signup } from './cmps/Signup.jsx'
import { GigEdit } from './pages/GigEdit.jsx'
// import { Pay } from './cmps/Pay.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    {/* <Route path="/pay" element={<Pay />} /> */}
                    <Route path="gig" element={<GigIndex />} />
                    <Route path="gig/edit" element={<GigEdit />} />
                    <Route path="gig/:gigId" element={<GigDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}



