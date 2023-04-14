import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";


async function handler (
    req:NextApiRequest, res:NextApiResponse){
   const { phone, email } = req.body;

   const payload = phone ? {phone: +phone} : {email}
   const user = await client.user.upsert({
        where:{
            ...payload

        },
        create: {
            name:"홍길동",
            ...payload
        },
        update:{},
    })      
    console.log(user)
//    if(email) {
//      user = await client.user.findUnique({
//         where: {
//             email,
//         },
//     });
//     if(user) console.log("found it")
//     if(!user){
//         console.log("찾지 못했습니다. 만들겠습니다.");
//         await client.user.create({
//             data: {
//                 name:"Anonymous",
//                 email,
//             },
//         });
       
//     }
//     console.log(user);
//    }
//    if(phone) {
//     user = await client.user.findUnique({
//        where: {
//             phone:Number(phone),
//        },
//    });
//    if(user) console.log("found it")
//    if(!user){
//        console.log("찾지 못했습니다. 만들겠습니다.");
//        await client.user.create({
//            data: {
//                name:"Anonymous",
//                phone:Number(phone),
//            },
//        });
    
//    }
//     console.log(user);
//   }

   return res.status(200).end();
}

export default withHandler("POST", handler);

