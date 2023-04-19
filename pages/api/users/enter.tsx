import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { randomInt } from "crypto";
import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";



async function handler (
    req:NextApiRequest,
    res:NextApiResponse<ResponseType>
    ){
   const { phone, email } = req.body;
   const user = phone ? {phone: +phone} :email? {email} : null;
   if(!user) return res.status(400).json({ok: false});
   const payload = Math.floor(10000 + Math.random() * 900000) + "";
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {    
                    where:{
                        ...user
            
                    },
                    create: {
                        name:"홍길동",
                        ...user
                    },},
            },
        },
    });

   return res.json({
    ok: true,
   });
}

export default withHandler("POST", handler);

