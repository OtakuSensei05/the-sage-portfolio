import { motion } from "framer-motion"


function ProjectBlackBox() {


return (

<motion.div

initial={{opacity:0, y:50}}

animate={{opacity:1, y:0}}

transition={{duration:0.8}}

className="max-w-5xl"

>


<h1 className="text-5xl font-bold mb-5">

Project Blackbox

</h1>



<h2 className="text-xl text-red-400 mb-6">

Research & Innovation Laboratory

</h2>



<p className="text-gray-300 leading-relaxed mb-10">


A digital laboratory documenting future projects,
engineering experiments and ideas.

This is where concepts move from imagination
towards reality.


</p>





<div className="grid md:grid-cols-2 gap-5">





<div className="p-6 rounded-xl border border-red-400 bg-white/5">


<h3 className="text-2xl mb-3">

🤖 Autonomous Robotics

</h3>


<p>

Future exploration of robotic systems,
automation and intelligent machines.

</p>


<span className="text-red-400">

STATUS: PLANNED

</span>


</div>







<div className="p-6 rounded-xl border border-cyan-400 bg-white/5">


<h3 className="text-2xl mb-3">

🌐 AI Engineering Systems

</h3>


<p>

Exploring AI applications in engineering,
research and productivity.

</p>


<span className="text-cyan-400">

STATUS: LEARNING

</span>


</div>







<div className="p-6 rounded-xl border border-yellow-400 bg-white/5">


<h3 className="text-2xl mb-3">

⚙️ Embedded Systems

</h3>


<p>

Microcontrollers, sensors,
electronics and automation projects.

</p>


<span className="text-yellow-400">

STATUS: UPCOMING

</span>


</div>







<div className="p-6 rounded-xl border border-purple-400 bg-white/5">


<h3 className="text-2xl mb-3">

🚀 Future Technologies

</h3>


<p>

Exploring ideas inspired by space,
advanced engineering and innovation.

</p>


<span className="text-purple-400">

STATUS: CONCEPT

</span>


</div>




</div>






<div className="mt-10 p-6 rounded-xl border border-white bg-white/5">


<h2 className="text-3xl mb-5">

Development Pipeline

</h2>



<div className="space-y-4 text-gray-300">


<p>
01 — Research & Learn
</p>


<p>
02 — Design & Simulate
</p>


<p>
03 — Prototype
</p>


<p>
04 — Improve & Deploy
</p>


</div>



</div>





</motion.div>


)

}


export default ProjectBlackBox