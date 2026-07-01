import { motion } from "framer-motion"
import { useEffect } from "react"


function BootSequence({onComplete}) {
useEffect(()=>{

const audio = new Audio("/audio/boot.mp3")

audio.volume = 0.4

audio.play()

},[])


return (

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50"

>


<motion.h1

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:0.5}}

className="text-4xl mb-8"

>

INITIALIZING SAGE NETWORK...

</motion.h1>



<motion.p

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:1.5}}

className="text-cyan-400 mb-4"

>

AI CORE ONLINE ✓

</motion.p>



<motion.p

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:2.5}}

className="text-green-400 mb-8"

>

ENGINEERING DATABASE LOADED ✓

</motion.p>




<motion.button

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:3.5}}

onClick={onComplete}

className="border border-cyan-400 px-8 py-3 rounded-xl hover:bg-cyan-400 hover:text-black transition"

>

ENTER SYSTEM

</motion.button>



</motion.div>


)

}


export default BootSequence