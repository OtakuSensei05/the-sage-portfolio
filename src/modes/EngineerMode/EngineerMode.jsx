import { motion } from "framer-motion"


function EngineerMode() {

  return (

    <motion.div

    initial={{opacity:0, y:50}}

    animate={{opacity:1, y:0}}

    transition={{duration:0.8}}

    className="max-w-4xl"

    >


      <h1 className="text-5xl font-bold mb-5">
        Kelvin Muchabaya
      </h1>


      <h2 className="text-xl text-cyan-400 mb-6">
        Mechatronics Engineering Student
      </h2>


      <p className="text-gray-300 mb-10 leading-relaxed">

      Exploring the intersection of engineering,
      artificial intelligence, software and hardware.

      Passionate about designing intelligent systems,
      automation, robotics and innovative technologies.

      </p>

<div className="mb-10">

<h2 className="text-3xl mb-5 text-cyan-400">
Education
</h2>


<div className="p-6 rounded-xl border border-cyan-400 bg-white/5">

<h3 className="text-xl">
Chinhoyi University of Technology
</h3>

<p>
Bachelor's Honours Degree in Mechatronic Engineering
</p>

<p className="text-gray-400">
Current Level: 3-1
</p>

</div>


</div>

      <div className="grid md:grid-cols-2 gap-5">


        <div className="p-6 rounded-xl border border-cyan-400 bg-white/5">

          <h3 className="text-2xl mb-3">
          ⚙️ Engineering
          </h3>

          <p>
          Mechatronics, CAD design, electronics,
          embedded systems and automation.
          </p>

        </div>



        <div className="p-6 rounded-xl border border-purple-400 bg-white/5">

          <h3 className="text-2xl mb-3">
          💻 Software
          </h3>

          <p>
          JavaScript, programming, AI tools,
          software development and problem solving.
          </p>

        </div>



        <div className="p-6 rounded-xl border border-green-400 bg-white/5">


          <h3 className="text-2xl mb-3">
          🛠 Tools
          </h3>

          <p>
          SolidWorks, AutoCAD, VS Code,
          NetBeans, Proteus.
          </p>


        </div>



        <div className="p-6 rounded-xl border border-red-400 bg-white/5">


          <h3 className="text-2xl mb-3">
          🚀 Vision
          </h3>

          <p>
          Building technologies and companies
          that create impact.
          </p>


        </div>


      </div>

<div className="mt-10">

<h2 className="text-3xl mb-5 text-cyan-400">
Technical Arsenal
</h2>


<div className="flex flex-wrap gap-3">


<span className="border border-white px-4 py-2 rounded-lg">
SolidWorks
</span>


<span className="border border-white px-4 py-2 rounded-lg">
AutoCAD
</span>


<span className="border border-white px-4 py-2 rounded-lg">
VS Code
</span>


<span className="border border-white px-4 py-2 rounded-lg">
NetBeans
</span>


<span className="border border-white px-4 py-2 rounded-lg">
Proteus
</span>


<span className="border border-white px-4 py-2 rounded-lg">
JavaScript
</span>


</div>

</div>
<div className="mt-10">

<h2 className="text-3xl mb-5 text-cyan-400">
Academic Record
</h2>



<div className="grid md:grid-cols-2 gap-5">


<div className="p-6 rounded-xl border border-cyan-400 bg-white/5">


<h3 className="text-2xl mb-3">
O Level
</h3>


<p>
3 As • 5 Bs • 3 Cs • 1 D
</p>


<p className="mt-3 text-gray-300">

A Grades:
Technical Graphics and Design,
Heritage Studies,
English Language

</p>


<p className="mt-3 text-gray-300">

Strong subjects:
Physics, Geography,
Combined Science, History

</p>


</div>





<div className="p-6 rounded-xl border border-purple-400 bg-white/5">


<h3 className="text-2xl mb-3">
A Level
</h3>


<p>
A: Pure Mathematics
</p>


<p>
B: Technical Graphics and Design
</p>


<p>
C: Physics
</p>


</div>



</div>


</div>
<div className="mt-10">


<h2 className="text-3xl mb-5 text-cyan-400">

Engineering Journey

</h2>



<div className="space-y-5">


<div className="p-5 rounded-xl border border-white bg-white/5">


<h3 className="text-xl">
2023 — Academic Foundation
</h3>


<p className="text-gray-300">

Completed A Level studies with focus on
Mathematics, Technical Graphics and Physics.

</p>


</div>





<div className="p-5 rounded-xl border border-cyan-400 bg-white/5">


<h3 className="text-xl">
2024 — Mechatronics Engineering
</h3>


<p className="text-gray-300">

Started Bachelor's Honours Degree in
Mechatronic Engineering at Chinhoyi University of Technology.

</p>


</div>





<div className="p-5 rounded-xl border border-purple-400 bg-white/5">


<h3 className="text-xl">
2026 — Digital Engineering Identity
</h3>


<p className="text-gray-300">

Developing skills in AI, software,
hardware, CAD design and engineering research.

</p>


</div>





<div className="p-5 rounded-xl border border-red-400 bg-white/5">


<h3 className="text-xl">
Future — Technology Innovation
</h3>


<p className="text-gray-300">

Building advanced technologies and companies
focused on solving real problems.

</p>


</div>



</div>


</div>
<div className="mt-10">

<h2 className="text-3xl mb-5 text-cyan-400">
Connect
</h2>


<div className="flex flex-wrap gap-4">


<a

href="#"

className="px-6 py-3 rounded-xl border border-cyan-400 bg-white/5 hover:bg-cyan-400 hover:text-black transition"

>

📄 Download CV

</a>



<a

href="#"

className="px-6 py-3 rounded-xl border border-purple-400 bg-white/5 hover:bg-purple-400 hover:text-black transition"

>

💻 GitHub

</a>



<a

href="#"

className="px-6 py-3 rounded-xl border border-blue-400 bg-white/5 hover:bg-blue-400 hover:text-black transition"

>

🔗 LinkedIn

</a>




<a

href="#"

className="px-6 py-3 rounded-xl border border-green-400 bg-white/5 hover:bg-green-400 hover:text-black transition"

>

✉️ Contact

</a>


</div>

</div>
    </motion.div>

  )

}


export default EngineerMode