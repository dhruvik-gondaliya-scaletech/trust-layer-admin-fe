import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { Dashboard, UsersList, UserDetails, DealsList, DealDetails, TransactionsList, TransactionDetails, DisputesList, DisputeDetails, Settings, ProfileDetails, AdminUsersPage, LoginPage } from "@/pages"
import { DesignSystem } from "@/pages/DesignSystem"
import { isAuthenticated } from "@/lib/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function ProtectedRoute() {
  const location = useLocation()
  
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
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
            <Route path="profile" element={<ProfileDetails />} />
            
            <Route path="admin-users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
