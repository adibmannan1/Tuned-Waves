import { Link } from "react-router-dom";

const DetailsHeader = ({artistId, songData}) => {
  const artist = songData?.song;
  const song = artistId? songData?.songs[0] : "";

  return(
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-[#000d0b] sm:48 h:28 rounded-lg mb-10 mt-6">
      <div className="inset-0 flex items-center p-6">
        <img src={artistId? song?.primary_artist?.image_url
        :artist?.song_art_image_url} alt="art" className="sm:w-40 w-28 sm:h-40 h-28 rounded-full object-cover
        border-2 shadow-xl shadow-black"/>

        <div className="ml-5">
          <p className="font-bold sm:text-2xl text-xl text-white">{artistId? song?.primary_artist?.name : 
          artist?.full_title}</p>
        
          <Link to={`/artists/${artist?.primary_artist?.id}`}>
            <p className="text-base text-gray-400 mt-0">{artist?.artist_names}</p>
          </Link>
          
          <p className="text-base text-white text-center leading-[35px] rounded-sm bg-[#172c21] w-[140px] 
          h-[35px] mt-3">{artistId? song?.release_date_for_display : artist?.release_date_for_display}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DetailsHeader;
