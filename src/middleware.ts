// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/','/api/fetch-transcript(.*)', ])

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
   
//   ],
// }
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/','/api/fetch-transcript(.*)', ])
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/' ])

export default clerkMiddleware(async (auth, request) => {

})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
   
  ],
}
