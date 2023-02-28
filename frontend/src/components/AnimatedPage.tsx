import {AnimatePresence, motion} from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
   children: JSX.Element
}

const stylesMotionDiv = `relative`

export default function AnimatedPage(props:Props){
   const router = useRouter()

   const [windowWidth, setWindowWidth] = useState(0)

   const animations = {
      initial: {
         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
         x: windowWidth
      },
      animate: {
         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
         x: 0
      },
      exit: {
         clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      }
   }

   const transition = {
      duration: .4,
      ease: 'easeOut'
   }

   useEffect(()=>{
      setWindowWidth(window.innerWidth)
   }, [])

   return (
      <AnimatePresence initial={false} mode='wait'>
         <motion.div className={stylesMotionDiv} variants={animations} initial='initial' animate='animate' exit='exit' key={router.route} transition={transition}>
            {props.children}
         </motion.div>
      </AnimatePresence>
   )
}