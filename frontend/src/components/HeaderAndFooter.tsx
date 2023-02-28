import Link from "next/link";
import DarkModeSwitcher from "./HeaderIcons/DarkModeSwitcher";
import ProfileIcon from "./HeaderIcons/ProfileIcon";

type Props = {
   children: JSX.Element
}

const stylesHeader = `border-b box-content flex h-16 items-center justify-between max-w-[1280px] m-auto px-[5%]`
const stylesTitle = `cursor-pointer font-bold font-title text-[30px]
sm:text-[34px]`
const stylesIcons = `cursor-pointer h-8 w-8
sm:h-9 sm:w-9
md:h-10 md:w-10`
const stylesFooter = `text-[12px] text-center
before:content-['©'] before:mr-1
sm:text-[16px]`

export default function HeaderAndFooter(props: Props){
   return (
      <>
      <header className={stylesHeader}>
         <DarkModeSwitcher styles={stylesIcons}/>

         <Link href='/' className={stylesTitle}>VR Planner</Link>

         <ProfileIcon styles={stylesIcons}/>
      </header>

      {props.children}

      <footer className={stylesFooter}>Copyright - Vinícius Roveri - 2023</footer>
      </>
   )
}