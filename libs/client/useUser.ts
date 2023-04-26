import { User } from "@prisma/client";
import { json } from "body-parser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import  useSWR from "swr";

interface ProfileResponse {
    ok: boolean;
    profile: User;
  }

export default function useUser () {
    const {data, error} = useSWR<ProfileResponse>("/api/users/me");
    
    const router = useRouter();
    useEffect(()=> {
        if(data && !data.ok) {
           router.replace("/enter");
        }
    }, [data, router])
  
    return {user: data?.profile, isLoading: !data && !error};
}