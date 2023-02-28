export const formStyles = {
   container: `flex flex-col items-center justify-center mt-8 w-full`,
   form: `flex flex-col items-center justify-center text-[18px] w-[80%]
   sm:text-[22px]
   md:text-[26px]`,
   fieldset: `relative w-full
   [&:not(:first-child)]:mt-[18px]
   sm:w-[80%]
   sm:[&:not(:first-child)]:mt-[20px]
   md:[&:not(:first-child)]:mt-[22px]`,
   label: `absolute flex flex-col items-center justify-center left-2 top-1
   peer-focus:text-[16px] peer-focus:-top-5
   peer-valid:text-[16px] peer-valid:-top-5
   sm:peer-focus:text-[20px] sm:peer-focus:-top-6
   sm:peer-valid:text-[20px] sm:peer-valid:-top-6
   md:peer-focus:text-[24px] md:peer-focus:-top-7
   md:peer-valid:text-[24px] md:peer-valid:-top-7`,
   input: `bg-transparent border px-2 peer py-1 rounded-lg w-full`,
   passwordInput: `pr-10`,
   inputError: `text-[14px] text-red-500
   dark:text-red-500
   sm:text-[18px]
   md:text-[22px]`,
   button: `bg-default-blue cursor-pointer mb-8 mt-6 p-0.5 rounded-lg text-default-white w-1/2
   dark:bg-default-beige dark:text-default-black
   active:scale-[98%]`,
   redirectP: `text-[16px]
   sm:text-[20px]
   md:text-[24px]`,
   redirectLink: `cursor-pointer font-bold tracking-wider`
}

export const loadingEvent = {
   _id: 0,
   allDay: false,
   color: '',
   date: '',
   name: 'Loading...',
   repeatMonthly: false
}

export const markerColors:{[key:string]:string} = {
   red: '#ff1616',
   orange: '#ff9316',
   yellow: '#ffdc17',
   green: '#26ff17',
   cyan: '#17fff0',
   blue: '#175dff',
   purple: '#9a17ff'
}

export const markerColorsNames = [
   'red',
   'orange',
   'yellow',
   'green',
   'cyan',
   'blue',
   'purple'
]

export const months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
]

export const pageTransitionDuration = 0.4

export const weekDays = [
   'Sun',
   'Mon',
   'Tue',
   'Wed',
   'Thu',
   'Fri',
   'Sat'
]

function getYears(){
   let yearsArray = []

   for(let i=1999; i <= 2099; i++){
      yearsArray.push(i)
   }

   return yearsArray
}
export const years = getYears()