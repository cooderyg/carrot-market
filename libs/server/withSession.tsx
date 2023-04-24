import { IronSessionOptions } from "iron-session";
import {withIronSessionApiRoute} from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user? : {
            id: number;
        }
    }
}


const cookieOptions :IronSessionOptions = {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!,
}
export function withApiSession(fn:any) {
    return withIronSessionApiRoute(fn, cookieOptions);

}