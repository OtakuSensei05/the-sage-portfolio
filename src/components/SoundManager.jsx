function SoundManager(){

const playSound = (sound)=>{

const audio = new Audio(`/audio/${sound}`)

audio.volume = 0.4

audio.play()

}


return playSound

}


export default SoundManager