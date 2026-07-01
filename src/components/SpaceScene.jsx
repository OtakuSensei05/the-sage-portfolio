import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useRef } from "react"



function Core(){

  const mesh = useRef()


  useFrame(() => {

    mesh.current.rotation.y += 0.01
    mesh.current.rotation.x += 0.005

  })


  return (

    <mesh ref={mesh}>


      <torusGeometry args={[1,0.25,32,100]} />


      <meshStandardMaterial

      color="#00ffff"

      emissive="#00ffff"

      emissiveIntensity={2}

      wireframe

      />

    </mesh>

  )

}




function SpaceScene(){


return (

<div className="absolute inset-0">


<Canvas>


<Stars
radius={100}
depth={50}
count={3000}
factor={3}
/>


<ambientLight intensity={0.5}/>


<pointLight
position={[5,5,5]}
intensity={3}
/>



<Core />


<OrbitControls />



</Canvas>


</div>

)


}


export default SpaceScene