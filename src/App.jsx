import BootSequence from "./components/BootSequence"
import SpaceScene from "./components/SpaceScene"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HUD from "./components/HUD"
import EngineerMode from "./modes/EngineerMode/EngineerMode"
import SageMode from "./modes/SageMode/SageMode"
import ProjectBlackBox from "./modes/ProjectBlackBox/ProjectBlackBox"
import SoundManager from "./components/SoundManager"
import SageLogo from "./components/SageLogo"
import SageAI from "./components/SageAI"


function App() {
const [booted,setBooted] = useState(false)
  const [mode, setMode] = useState("home")
  const playSound = SoundManager()

if(!booted){

return (

<BootSequence

onComplete={()=>setBooted(true)}

/>

)

}
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
      <HUD />
      <SageAI />
      <SpaceScene />
      <div className="absolute inset-0 opacity-20">

<div className="w-full h-full bg-[linear-gradient(90deg,#ffffff08_1px,transparent_1px),linear-gradient(#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]">

</div>

</div>


      <div className="relative z-10">

{mode === "home" && (

        <>
<SageLogo />
        <motion.h1
initial={{ opacity: 0, y: -50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
className="text-5xl font-bold mb-5"
>

THE SAGE NETWORK

</motion.h1>


        <p className="text-gray-400 mb-10">
          Select your experience
        </p>


        <motion.div
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
className="flex flex-col md:flex-row gap-5"
>


          <motion.button

whileHover={{ scale: 1.08, rotateX: 5 }}

whileTap={{ scale: 0.95 }}

onClick={() => {

playSound("activate.mp3")

setMode("engineer")

}}

className="
p-8
rounded-2xl
border
border-cyan-400
bg-white/5
backdrop-blur-lg
shadow-[0_0_25px_rgba(0,255,255,0.4)]
hover:bg-cyan-400/20
transition
"

>

⚙️ Engineer Mode

</motion.button>



          <motion.button

whileHover={{ scale: 1.08, rotateX: 5 }}

whileTap={{ scale: 0.95 }}

onClick={() => {

playSound("activate.mp3")

setMode("sage")

}}

className="
p-8
rounded-2xl
border
border-purple-400
bg-white/5
backdrop-blur-lg
shadow-[0_0_25px_rgba(168,85,247,0.4)]
hover:bg-purple-400/20
transition
"

>

🧠 The Sage Mode

</motion.button>



          <motion.button

whileHover={{ scale: 1.08, rotateX: 5 }}

whileTap={{ scale: 0.95 }}

onClick={() => {

playSound("activate.mp3")

setMode("blackbox")

}}

className="
p-8
rounded-2xl
border
border-red-400
bg-white/5
backdrop-blur-lg
shadow-[0_0_25px_rgba(255,0,0,0.4)]
hover:bg-red-400/20
transition
"

>

🔒 Project BlackBox

</motion.button>


        </motion.div>

</>

      )}



      <AnimatePresence mode="wait">


{mode === "engineer" && (

<motion.div

initial={{opacity:0, x:100}}

animate={{opacity:1, x:0}}

exit={{opacity:0, x:-100}}

transition={{duration:0.5}}

>

<button

onClick={() => setMode("home")}

className="mb-10 border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black"

>

← Return

</button>


<EngineerMode />

</motion.div>

)}



{mode === "sage" && (

<motion.div

initial={{opacity:0, x:100}}

animate={{opacity:1, x:0}}

exit={{opacity:0, x:-100}}

transition={{duration:0.5}}

>

<button

onClick={() => setMode("home")}

className="mb-10 border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black"

>

← Return

</button>


<SageMode />

</motion.div>

)}




{mode === "blackbox" && (

<motion.div

initial={{opacity:0, x:100}}

animate={{opacity:1, x:0}}

exit={{opacity:0, x:-100}}

transition={{duration:0.5}}

>

<button

onClick={() => setMode("home")}

className="mb-10 border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black"

>

← Return

</button>


<ProjectBlackBox />

</motion.div>

)}


</AnimatePresence>
</div>

    </div>
  )
}


export default App