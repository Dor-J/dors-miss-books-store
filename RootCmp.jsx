const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { NotFound } from './cmps/NotFound.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { DashBoard } from './cmps/DashBoard.jsx'

import { BookEdit } from './pages/BookEdit.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

import { AboutUs } from './pages/AboutUs.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AboutGoal } from './cmps/AboutGoal.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />

        <main className='main-layout'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />

            <Route path='/about' element={<AboutUs />}>
              <Route path='team' element={<AboutTeam />} />
              <Route path='goal' element={<AboutGoal />} />
              <Route path='dashboard' element={<DashBoard />} />
            </Route>

            <Route path='/book' element={<BookIndex />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
            <Route path='/book/edit' element={<BookEdit />} />
            <Route path='/book/edit/:bookId' element={<BookEdit />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </section>
      <UserMsg />
    </Router>
  )
}
