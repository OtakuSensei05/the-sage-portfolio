import { motion } from "framer-motion"


function SageLogo(){

return (

<motion.div

initial={{opacity:0, scale:0.5}}

animate={{opacity:1, scale:1}}

transition={{duration:1}}

className="text-center"

>


<h1

className="
text-4xl md:text-6xl
font-bold
tracking-widest
text-cyan-400
drop-shadow-[0_0_20px_cyan]
"

>

THE SAGE

</h1>



<p className="text-gray-400 mt-3 tracking-widest">

ENGINEERING • AI • INNOVATION

</p>



</motion.div>


)

}


export default SageLogo