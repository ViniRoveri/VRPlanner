import {ArrowLongLeftIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

const headerSize = 64
const stylesIcon = `absolute cursor-pointer h-10 left-0 m-4 top-0 w-10
sm:h-11 sm:m-5 sm:w-11
md:h-12 md:m-6 md:w-12
xl:mx-[calc(50%-640px+8px)]`

export default function GoBackArrow(){
   const router = useRouter()

   function handleClick(){
      router.back()
   }

   return (
      <ArrowLongLeftIcon className={stylesIcon} onClick={handleClick}/>
   )
}