import {UserIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

type Props = {
   styles: string
}

export default function ProfileIcon(props: Props){
   const router = useRouter()

   return (
      <button onClick={()=> router.push('/account')} type='button'>
         <UserIcon className={props.styles}/>
      </button>
   )
}