const AUTH_KEY = "trustlayer_admin_auth_token"

export function login(token: string = "mock-token-12345") {
  localStorage.setItem(AUTH_KEY, token)
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
  sessionStorage.clear()
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(AUTH_KEY)
}

export function getCurrentUser() {
  return {
    name: "Eric Mills",
    email: "admin@trustlayer.com",
    role: "Super Admin",
  }
}
