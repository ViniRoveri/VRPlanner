import { getOptionHeight } from "@/common/functions"
import { formStyles, markerColors, markerColorsNames } from "@/common/globalConstants"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type Props = {
   selectedColor: string
   setSelectedColor: Dispatch<SetStateAction<string>>
}

const stylesContainerSelected = `cursor-pointer flex items-center justify-center`
const stylesLabel = `absolute flex flex-col items-center justify-center left-2 text-[16px] -top-5
sm:text-[20px] sm:-top-6
md:text-[24px] md:-top-7`
const stylesIcon = `absolute cursor-pointer flex items-center justify-center h-5 right-3 top-2.5 w-5
sm:h-6 sm:w-6
md:h-7 md:w-7`
const stylesOptions = `absolute border-y max-h-[calc(39px*4.5)] overflow-y-auto text-center w-full z-10
sm:max-h-[calc(45px*4.5)]
md:max-h-[calc(51px*4.5)]`
const stylesOption = `border bg-default-beige capitalize cursor-pointer py-0.5 text-[22px] w-full
dark:bg-default-darkBrown
last:rounded-b-lg
sm:text-[26px]
md:text-[30px]`
const stylesColorCircle = `h-3 inline-block mr-2 rounded-full w-3`
const stylesActiveColor = `!bg-default-blue font-bold text-default-beige
dark:!bg-default-beige dark:text-default-darkBrown`

export default function MarkerColorSelector(props:Props){
   const options = useRef<HTMLUListElement>(null)

   const [optionsAreOpen, setOptionsAreOpen] = useState(false)
   const [selectorRoundedBorders, setSelectorRoundedBorders] = useState('')

   function handleColorClick(newColor:string){
      props.setSelectedColor(newColor)

      setOptionsAreOpen(false)
   }

   useEffect(()=>{
      if(optionsAreOpen && options.current){
         const selectedColorIndex = markerColorsNames.findIndex(color=> color === props.selectedColor)

         const optionHeight = getOptionHeight()

         options.current.scroll(0, (optionHeight - 2) * selectedColorIndex)
      }

      if(optionsAreOpen){
         setSelectorRoundedBorders('!rounded-b-none')
      }else{
         setSelectorRoundedBorders('')
      }
   }, [optionsAreOpen])

   return (
      <fieldset className={formStyles.fieldset} onBlur={()=>setOptionsAreOpen(false)} tabIndex={0}>
         <div className={stylesContainerSelected} onClick={()=> setOptionsAreOpen(!optionsAreOpen)}>
            <h3 className={
               `${formStyles.input} ${selectorRoundedBorders} capitalize`
            }>
               <span className={stylesColorCircle} style={{backgroundColor: markerColors[props.selectedColor]}}/>

               {props.selectedColor}
            </h3>

            <p className={stylesLabel}>Marker color:</p>

            <div className={stylesIcon}>
               {optionsAreOpen ?
                  <ChevronUpIcon/>
                  :
                  <ChevronDownIcon/>
               }
            </div>
         </div>


         <ul className={`${stylesOptions} ${!optionsAreOpen ? 'hidden' : ''}`} ref={options}>
            {markerColorsNames.map(color=>(
               <li className={`${stylesOption} ${color === props.selectedColor ? stylesActiveColor : ''}`} key={color} onClick={()=> handleColorClick(color)}>
                  <span className={stylesColorCircle} style={{backgroundColor: markerColors[color]}}/>

                  {color}
               </li>
               ))}
         </ul>
      </fieldset>
   )
}