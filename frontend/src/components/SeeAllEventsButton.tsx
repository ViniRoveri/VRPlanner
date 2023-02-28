import { formStyles } from '@/common/globalConstants'
import {ListBulletIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const stylesButton = `${formStyles.button} flex items-center justify-center !my-6 text-[20px] !w-full
sm:text-[24px]
md:text-[28px]`
const stylesButtonIcon = `fill-default-white h-5 inline-block mr-2 w-5
dark:fill-default-black`

export default function SeeAllEventsButton(){
   const router = useRouter()

   const [containerIsHidden, setContainerIsHidden] = useState(false)

   function handleClick(){
      router.push('/event/list')
   }

   function showOrHideContainer(){
      const windowWidth = window.innerWidth

      if(windowWidth >= 769){
         setContainerIsHidden(true)
      }else{
         setContainerIsHidden(false)
      }
   }

   useEffect(()=>{
      showOrHideContainer()

      window.addEventListener('resize', showOrHideContainer)
   }, [])

   return (
      <div className={containerIsHidden ? 'hidden' : ''}>     
         <button className={stylesButton} onClick={handleClick} type="button">
            <ListBulletIcon className={stylesButtonIcon}/>

            See all events
         </button>
      </div>
   )
}