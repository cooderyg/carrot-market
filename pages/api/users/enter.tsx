import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler (
    req:NextApiRequest, res:NextApiResponse){
   const { phone, email } = JSON.parse(req.body);
   let user;
   if(email) {
     user = await client.user.findUnique({
        where: {
            email,
        },
    });
    if(!user){
        console.log("찾지 못했습니다. 만들겠습니다.");
        await client.user.create({
            data: {
                name:"Anonymous",
                email,
            },
        });
       
    }
    console.log(user);
   }
   return res.status(200).end();
}

export default withHandler("POST", handler);

