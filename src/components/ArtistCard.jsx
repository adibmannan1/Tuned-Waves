import { useNavigate } from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate = useNavigate()
  
  return(
    <div className="flex flex-col w-[247px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={()=>navigate(`/artists/${track?.primary_artist?.id}`)}>
      <img src={track?.primary_artist?.image_url} alt="artist" className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{track.primary_artist?.name}</p>
    </div>
  )
};

export default ArtistCard;
