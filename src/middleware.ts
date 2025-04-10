import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/api/leads"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 