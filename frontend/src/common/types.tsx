import { NextRequest, NextResponse } from "next/server"

export type Ctx = {
   req:NextRequest
   res:NextResponse
}

export type UserEvent = {
   _id: number
   allDay: boolean
   color: string
   date: Date | string
   name: string
   repeatMonthly: boolean
   repeatYearly: boolean
}