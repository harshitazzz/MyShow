import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { ArrowRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion,useAnimation } from 'framer-motion'
const HeroSection = () => {

  const navigate = useNavigate();
  const controls = useAnimation();
  const [isExisting, setIsExisting] = useState(false); 
  const handleExplore = async () => {
    if (isExisting) return
    setIsExisting(true)
    await controls.start({ opacity: 0, transition: { duration: 1.2 } })
    navigate('/movies')
  }
  return (
    <motion.div 
    initial={{ opacity: 1}}
    animate={controls}
    style={{ pointerEvents: isExisting ? 'none' : 'auto' }}
    className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20'/>
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians<br/>of the Galaxy</h1>
      <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive,two people meet in london and try to stop a consipiracy.</p>
      <motion.button 
      onClick={handleExplore}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={isExisting}
      className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore Movies
        <ArrowRight className='w-5 h-5'/>
      </motion.button>
    </motion.div>
  )
}

export default HeroSection
