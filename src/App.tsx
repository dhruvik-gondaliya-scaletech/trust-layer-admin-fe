import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { Dashboard, UsersList, UserDetails, DealsList, DealDetails, TransactionsList, TransactionDetails, DisputesList, DisputeDetails, Settings } from "@/pages"
import { DesignSystem } from "@/pages/DesignSystem"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="deals" element={<DealsList />} />
          <Route path="deals/:id" element={<DealDetails />} />
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="transactions/:id" element={<TransactionDetails />} />
          <Route path="disputes" element={<DisputesList />} />
          <Route path="disputes/:id" element={<DisputeDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
