import { useState } from "react"
import { motion } from "framer-motion"


function SageAI(){


const [message,setMessage] = useState("")


const askAI = (question)=>{


if(question==="engineering"){

setMessage(
"Kelvin is a Mechatronics Engineering student exploring AI, software, hardware and intelligent systems."
)

}


if(question==="skills"){

setMessage(
"Skills include CAD design, programming, engineering tools and digital innovation."
)

}


if(question==="vision"){

setMessage(
"The vision is to create impactful technology and build solutions for Africa and beyond."
)

}


if(question==="projects"){

setMessage(
"Project Blackbox is the future research laboratory for robotics, AI and engineering experiments."
)

}


}



return (

<motion.div

initial={{opacity:0,x:50}}

animate={{opacity:1,x:0}}

className="
fixed
bottom-5
right-5
w-[90%] md:w-80
p-5
rounded-xl
border
border-cyan-400
bg-black/70
backdrop-blur-lg
z-30
"


>


<h2 className="text-cyan-400 mb-3">

🤖 SAGE AI ONLINE

</h2>



<p className="text-sm text-gray-300 mb-4">

Ask about Kelvin

</p>



<div className="space-y-2">


<button

onClick={()=>askAI("engineering")}

className="block w-full border p-2 rounded"

>

Engineering

</button>



<button

onClick={()=>askAI("skills")}

className="block w-full border p-2 rounded"

>

Skills

</button>



<button

onClick={()=>askAI("vision")}

className="block w-full border p-2 rounded"

>

Vision

</button>



<button

onClick={()=>askAI("projects")}

className="block w-full border p-2 rounded"

>

Projects

</button>


</div>



<p className="mt-4 text-sm text-cyan-300">

{message}

</p>


</motion.div>


)

}


export default SageAI