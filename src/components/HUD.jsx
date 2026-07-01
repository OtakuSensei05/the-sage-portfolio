import { motion } from "framer-motion"


function HUD(){

return (

<div className="fixed top-5 left-5 z-20">


<motion.div

initial={{opacity:0,x:-50}}

animate={{opacity:1,x:0}}

className="p-5 rounded-xl border border-cyan-400 bg-black/40 backdrop-blur-md"

>


<p className="text-cyan-400">

● SYSTEM ONLINE

</p>


<p>

AI CORE: ACTIVE

</p>


<p>

ENGINEERING MODE: READY

</p>


</motion.div>


</div>

)

}


export default HUD