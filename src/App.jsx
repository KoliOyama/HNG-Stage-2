import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import InvoiceListPage from '@/pages/InvoiceListPage'
import InvoiceDetailPage from '@/pages/InvoiceDetailPage'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<InvoiceListPage />} />
        <Route path="/:id" element={<InvoiceDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App