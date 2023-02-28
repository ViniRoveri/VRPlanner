import { formStyles } from '@/common/globalConstants'
import {ListBulletIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

const stylesButton = `${formStyles.button} flex items-center justify-center !my-6 text-[20px] !w-full
sm:text-[24px]
md:text-[28px]`
const stylesButtonIcon = `fill-default-white h-5 inline-block mr-2 w-5
dark:fill-default-black`

export default function SeeAllEventsButton(){
   const router = useRouter()

   function handleClick(){
      router.push('/event/list')
   }

   return (
      <button className={stylesButton} onClick={handleClick} type="button">
         <ListBulletIcon className={stylesButtonIcon}/>

         See all events
      </button>
   )
}