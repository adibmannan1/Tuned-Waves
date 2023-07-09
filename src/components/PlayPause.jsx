import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa'
const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => (
  isPlaying && activeSong?.full_title === song.full_title ? 
  (<FaPauseCircle size={50} className='text-[#1ce783]' onClick={handlePause}/>) : 
  (<FaPlayCircle size={50} className='text-[#1ce783]' onClick={handlePlay}/>)
  )

export default PlayPause;
