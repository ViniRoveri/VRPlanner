import { getConnectedUser, authenticateUserServerSide } from "@/common/functions";
import { Ctx } from "@/common/types";
import DefaultHead from "@/components/DefaultHead";
import GoBackArrow from "@/components/GoBackArrow";
import cookiesServices from "@/services/cookiesServices";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx:Ctx){
   return await authenticateUserServerSide(ctx)
}

const stylesContainer = `flex flex-col items-center justify-center`
const stylesTitle = `font-title text-[35px] text-right w-full
sm:text-[39px]
md:text-[43px]`
const stylesH3 = `text-[22px] text-center w-full
sm:text-[26px]
md:text-[30px]`
const stylesConnectedUser = `font-bold text-[28px] tracking-wider
sm:text-[32px]
md:text-[36px]`
const stylesH4 = `mt-6 text-[20px] w-full
sm:text-[24px]
md:text-[28px]`
const stylesLink = `cursor-pointer font-bold tracking-wider`

export default function AccountPage(){
   const [connectedUser, setConnectedUser] = useState('...')

   useEffect(()=>{
      const userId = cookiesServices.getUserId()

      getConnectedUser(userId, setConnectedUser)
   }, [])

   return (
      <>
      <DefaultHead title="Account | VR Planner"/>

      <GoBackArrow/>

      <main className={stylesContainer}>
         <h2 className={stylesTitle}>Account options:</h2>

         <h3 className={stylesH3}>Connected User: <b className={stylesConnectedUser}>{connectedUser}</b></h3>
         
         <h4 className={stylesH4}>- Edit your username <Link className={stylesLink} href='/user/edit/username'>here...</Link></h4>

         <h4 className={stylesH4}>- Edit your password <Link className={stylesLink} href='/user/edit/password'>here...</Link></h4>

         <h4 className={stylesH4}>- Logout <Link className={stylesLink} href='/logout'>here...</Link></h4>
      </main>
      </>
   )
}