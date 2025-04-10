import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/features",
    "/pricing",
    "/privacy",
    "/terms",
    "/quote",
    "/quote/success",
    "/api/leads",
    "/how-it-works"
  ]
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 