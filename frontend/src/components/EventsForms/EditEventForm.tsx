import { loadingEvent, formStyles } from "@/common/globalConstants"
import { UserEvent } from "@/common/types"
import eventsServices from "@/services/eventsServices"
import validationServices from "@/services/validationServices"
import { useRouter } from "next/router"
import { useRef, useState, FormEvent, useEffect } from "react"
import FormCheckbox from "../FormCheckbox"
import EventNameInputErrorElement from "../InputErrorElements/EventNameInputErrorElement"
import LoadingScreen from "../LoadingScreen"
import MarkerColorSelector from "../MarkerColorSelector"


type Props = {
   selectedEvent: UserEvent
}

export default function EditEventForm(props:Props){
   const router = useRouter()

   const eventTimeInput = useRef<HTMLInputElement>(null)

   const {eventId} = router.query
   const eventIdNumber = Number(eventId)
   const {md} = router.query
   const monthDisplay = typeof md === 'string' ? Number(md) : undefined
   
   const [allDay, setAllDay] = useState(false)
   const [eventNameInputError, setEventNameInputError] = useState(<></>)
   const [eventNameInputValue, setEventNameInputValue] = useState('')
   const [eventTimeInputValue, setEventTimeInputValue] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [repeatMonthly, setRepeatMonthly] = useState(false)
   const [repeatYearly, setRepeatYearly] = useState(false)
   const [selectedColor, setSelectedColor] = useState('red')

   async function editEvent(){
      const editedEvent = createEditedEvent()

      try{
         if(editedEvent){
            await eventsServices.editEvent(editedEvent, eventIdNumber)
            .then(()=>{
               router.push('/')
            })
         }
      }catch(err){
         alert("Couldn't edit event, try again.")

         setIsLoading(false)
      }
   }

   function createEditedEvent(){
      const selectedEventDate = new Date(props.selectedEvent.date)

      const selectedDay = selectedEventDate.getDate()
      let selectedMonthIndex = selectedEventDate.getMonth()
      const selectedYear = selectedEventDate.getFullYear()
      if(!repeatMonthly && monthDisplay){
         selectedMonthIndex = monthDisplay - 1
      }

      let selectedHour = 0
      let selectedMinutes = 0

      if(eventTimeInput.current){
         const selectedTime = eventTimeInputValue

         selectedHour = Number(selectedTime.slice(0, 2))
         selectedMinutes = Number(selectedTime.slice(3, 5))
      }
      
      const eventDate = new Date(selectedYear, selectedMonthIndex, selectedDay, selectedHour, selectedMinutes)

      const eventName = eventNameInputValue
      
      const editedEvent = {
         allDay: allDay,
         color: selectedColor,
         date: eventDate,
         name: eventName,
         repeatMonthly: repeatMonthly,
         repeatYearly: repeatYearly
      }

      return editedEvent
   }

   function clearAllErrors(){
      setEventNameInputError(<></>)
   }

   function validateEventNameInput(){
      const eventName = eventNameInputValue

      const eventNameInputCheck = validationServices.validateEventNameInput(eventName)

      const eventNameInputIsValid = eventNameInputCheck.ok

      if(!eventNameInputIsValid){
         setEventNameInputError(<EventNameInputErrorElement message={eventNameInputCheck.message}/>)
      }

      return eventNameInputIsValid
      
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

         editEvent()
      }
   }

   useEffect(()=>{
      if(props.selectedEvent !== loadingEvent){
         setAllDay(props.selectedEvent.allDay)

         setEventNameInputValue(props.selectedEvent.name)

         const selectedEventDate = new Date(props.selectedEvent.date)
         const formattedHour = String(selectedEventDate.getHours()).padStart(2, '0')
         const formattedMinutes = String(selectedEventDate.getMinutes()).padStart(2, '0')
         const startingEventTimeInput = !props.selectedEvent.allDay ? 
            `${formattedHour}:${formattedMinutes}`
         : ''
         setEventTimeInputValue(startingEventTimeInput)

         setRepeatMonthly(props.selectedEvent.repeatMonthly)

         setSelectedColor(props.selectedEvent.color)
      }
   }, [props.selectedEvent])

   useEffect(()=>{
      if(repeatMonthly){
         setRepeatYearly(false)
      }
   }, [repeatMonthly])
   
   useEffect(()=>{
      if(repeatYearly){
         setRepeatMonthly(false)
      }
   }, [repeatYearly])
   
   return (
      <section className={formStyles.container}>
         <form className={formStyles.form} onSubmit={handleSubmit}>
            <fieldset className={formStyles.fieldset}>
               <input className={formStyles.input} id='eventNameInput' onChange={e=>setEventNameInputValue(e.target.value)} required type="text" value={eventNameInputValue}/>

               <label className={formStyles.label} htmlFor='eventNameInput'>New Event name:</label>

               {eventNameInputError}
            </fieldset>
            
            {!allDay &&
               <fieldset className={formStyles.fieldset}>
                  <input className={formStyles.input} id='eventTimeInput' onChange={e=>setEventTimeInputValue(e.target.value)} ref={eventTimeInput} required type="time" value={eventTimeInputValue}/>

                  <label className={formStyles.label} htmlFor='eventTimeInput'>New Event time:</label>
               </fieldset>
            }

            <FormCheckbox message={'All day'} state={allDay} setState={setAllDay}/>

            <MarkerColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
            
            <FormCheckbox message={'Repeat every month'} state={repeatMonthly} setState={setRepeatMonthly}/>
            
            <FormCheckbox message={'Repeat every year'} state={repeatYearly} setState={setRepeatYearly}/>

            <button className={formStyles.button} type="submit">Edit</button>
         </form>

         {isLoading && 
            <LoadingScreen message='Editing event...'/>
         }
      </section>
   )
}