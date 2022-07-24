// Require login to access dashboard page
export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/dashboard'],
}
