const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { Team } from './cmps/Team.jsx'
import { Vision } from './cmps/Vision.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader setPage={onSetPage} />

        <main className='main-layout'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />

            <Route path='/about' element={<AboutUs />}>
              <Route path='team' element={<Team />} />
              <Route path='vision' element={<Vision />} />
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
