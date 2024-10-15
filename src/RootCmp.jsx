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
import { GigAdd } from './pages/GigAdd.jsx'
import { Checkout } from './pages/Checkout.jsx'
import { Dashboard } from './pages/DashBoard.jsx'
import { Profile } from './pages/Profile.jsx'
import { BecomeSeller } from './pages/BecomeSeller.jsx'
import { Inbox } from './pages/inbox.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="seller/register" element={<BecomeSeller />} />
                    <Route path="gig" element={<GigIndex />} />
                    <Route path="gig/edit" element={<GigAdd />} />
                    <Route path="gig/:gigId" element={<GigDetails />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="checkout/:orderId/:price" element={<Checkout />} />
                    <Route path="user/Dashboard/:id" element={<Dashboard />} />
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



