import { motion } from "framer-motion"


function SageMode() {


return (

<motion.div

initial={{opacity:0, y:50}}

animate={{opacity:1, y:0}}

transition={{duration:0.8}}

className="max-w-4xl"

>


<h1 className="text-5xl font-bold mb-5">

The Sage Mode

</h1>



<h2 className="text-xl text-purple-400 mb-6">

Knowledge • Curiosity • Exploration

</h2>



<p className="text-gray-300 leading-relaxed mb-10">


A journey of continuous learning across technology,
science, human behaviour and the systems that shape
the world.

Engineering builds the future, but understanding
the world creates better solutions.


</p>




<div className="grid md:grid-cols-2 gap-5">





<div className="p-6 rounded-xl border border-purple-400 bg-white/5">


<h3 className="text-2xl mb-3">

🤖 Artificial Intelligence

</h3>


<p>

Exploring how AI can improve engineering,
learning, research and productivity.

</p>


</div>






<div className="p-6 rounded-xl border border-blue-400 bg-white/5">


<h3 className="text-2xl mb-3">

🚀 Space & Future Technology

</h3>


<p>

Fascinated by rockets, astronomy,
space exploration and advanced systems.

</p>


</div>







<div className="p-6 rounded-xl border border-yellow-400 bg-white/5">


<h3 className="text-2xl mb-3">

📚 Research Library

</h3>


<p>

Exploring books and ideas in psychology,
sociology, history, economics and science.

</p>


</div>







<div className="p-6 rounded-xl border border-green-400 bg-white/5">


<h3 className="text-2xl mb-3">

🌱 Growth Philosophy

</h3>


<p>

Constantly learning, adapting and improving
through curiosity and discipline.

</p>


</div>



</div>





<div className="mt-10 p-6 rounded-xl border border-white bg-white/5">


<h2 className="text-3xl mb-4">

Current Learning Mission

</h2>



<ul className="space-y-3 text-gray-300">


<li>
✓ Artificial Intelligence applications
</li>


<li>
✓ Engineering innovation
</li>


<li>
✓ Business and entrepreneurship
</li>


<li>
✓ Human behaviour and society
</li>


<li>
✓ Future technologies
</li>


</ul>



</div>




</motion.div>


)


}


export default SageMode