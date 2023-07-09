import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery} from "../redux/services/genius";
import { playPause, setActiveSong } from "../redux/features/playerSlice";


const ArtistDetails = () => {
    const {id: artistId} = useParams()
    const { activeSong, isPlaying } = useSelector((state)=>state.player)
    const {data: artistData, isFetching: isArtistDetails, error} = useGetArtistDetailsQuery(artistId)
    console.log(artistData)
    const handlePauseClick = () => {
      dispatch(playPause(false))
    }
    const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({song, data, i}))
      dispatch(playPause(true))
    }
    return(
      <div className="flex flex-col">
          <DetailsHeader artistId={artistId} songData={artistData}/>

          <RelatedSongs data={artistData?.songs} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
      </div>
    )
}

export default ArtistDetails;
