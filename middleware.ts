import { authMiddleware } from "@clerk/nextjs";

export default function authMiddleWare() {
        publicRoutes:['/']
}


export const config = {
    matcher:["/((?!.+.[w]+$|_next).*)", "/","/api|trpc)((.*)"]
}
