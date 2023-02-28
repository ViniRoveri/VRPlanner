import { formStyles } from "@/common/globalConstants"
import { useSelectedDate } from "@/common/hooks"
import eventsServices from "@/services/eventsServices"
import validationServices from "@/services/validationServices"
import { useRouter } from "next/router"
import { useRef, useState, FormEvent } from "react"
import FormCheckbox from "../FormCheckbox"
import EventNameInputErrorElement from "../InputErrorElements/EventNameInputErrorElement"
import LoadingScreen from "../LoadingScreen"
import MarkerColorSelector from "../MarkerColorSelector"


export default function AddEventForm(){
   const router = useRouter()
   const selectedDate = useSelectedDate()
   
   const eventNameInput = useRef<HTMLInputElement>(null)
   const eventTimeInput = useRef<HTMLInputElement>(null)

   const [allDay, setAllDay] = useState(false)
   const [eventNameInputError, setEventNameInputError] = useState(<></>)
   const [isLoading, setIsLoading] = useState(false)
   const [repeatMonthly, setRepeatMonthly] = useState(false)
   const [selectedColor, setSelectedColor] = useState('red')

   async function addEvent(){
      const newEvent = createNewEvent()

      try{
         if(newEvent){
            await eventsServices.addEvent(newEvent)
            .then(()=>{
               router.push('/')
            })
         }
      }catch(err){
         alert("Couldn't add event, try again.")

         setIsLoading(false)
      }
   }

   function createNewEvent(){
      if(eventNameInput.current){
         const eventId = new Date().getTime()

         const selectedDay = selectedDate.getDate()
         const selectedMonthIndex = selectedDate.getMonth()
         const selectedYear = selectedDate.getFullYear()

         let selectedHour = 0
         let selectedMinutes = 0
         if(eventTimeInput.current){
            const selectedTime = eventTimeInput.current.value
            
            selectedHour = Number(selectedTime.slice(0, 2))
            selectedMinutes = Number(selectedTime.slice(3, 5))
         }

         const eventDate = new Date(selectedYear, selectedMonthIndex, selectedDay, selectedHour, selectedMinutes)

         const eventName = eventNameInput.current.value
         
         const newEvent = {
            _id: eventId,
            allDay: allDay,
            color: selectedColor,
            date: eventDate,
            name: eventName,
            repeatMonthly: repeatMonthly
         }

         return newEvent
      }
   }

   function clearAllErrors(){
      setEventNameInputError(<></>)
   }

   function validateEventNameInput(){
      if(eventNameInput.current){
         const eventName = eventNameInput.current.value

         const eventNameInputCheck = validationServices.validateEventNameInput(eventName)

         const eventNameInputIsValid = eventNameInputCheck.ok

         if(!eventNameInputIsValid){
            setEventNameInputError(<EventNameInputErrorElement message={eventNameInputCheck.message}/>)
         }

         return eventNameInputIsValid
      }
   }

   function validateAllInputs(){
      const eventNameInputIsValid = validateEventNameInput()
      
      if(eventNameInputIsValid){
         return true
      }

      return false
   }
   
   function handleSubmit(e:FormEvent){
      e.preventDefault()

      clearAllErrors()

      const allInputsAreValid = validateAllInputs()

      if(allInputsAreValid){
         setIsLoading(true)

         addEvent()
      }
   }

   return (
      <section className={formStyles.container}>
         <form className={formStyles.form} onSubmit={handleSubmit}>
            <fieldset className={formStyles.fieldset}>
               <input className={formStyles.input} id='eventNameInput' ref={eventNameInput} required type="text"/>

               <label className={formStyles.label} htmlFor='eventNameInput'>Event name:</label>

               {eventNameInputError}
            </fieldset>
            
            {!allDay &&
               <fieldset className={formStyles.fieldset}>
                  <input className={formStyles.input} id='eventTimeInput' ref={eventTimeInput} required type="time"/>

                  <label className={formStyles.label} htmlFor='eventTimeInput'>Event time:</label>
               </fieldset>
            }

            <FormCheckbox message={'All day'} state={allDay} setState={setAllDay}/>

            <MarkerColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
            
            <FormCheckbox message={'Repeat every month'} state={repeatMonthly} setState={setRepeatMonthly}/>

            <button className={formStyles.button} type="submit">Add</button>
         </form>

         {isLoading && 
            <LoadingScreen message='Adding event...'/>
         }
      </section>
   )
}