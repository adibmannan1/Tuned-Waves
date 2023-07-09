import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery} from "../redux/services/genius";
import { useEffect, useState } from "react";


const SongDetails = () => {
    const dispatch = useDispatch()
    const {songid} = useParams()
    const { activeSong, isPlaying } = useSelector((state)=>state.player)
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid})
    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})
    const [lyrics, setLyrics] = useState('');
    
    const handlePauseClick = () => {
      dispatch(playPause(false))
    }
    const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({song, data, i}))
      dispatch(playPause(true))
    }


  useEffect(() => { 
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songid}&text_format=html`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '37334518dfmshf3643bd84abc70ap1788cbjsn8ab512155e5f',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };

    const fetchLyrics = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setLyrics(result?.lyrics?.lyrics?.body?.html);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLyrics();
  }, []);

  const modifiedLyrics = lyrics.replace(
    /\[(.*?)\]/g,
    '<span class="highlight">$1</span>'
  );
    return(
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                <div className="mt-5 text-gray-400 lyrics" dangerouslySetInnerHTML={{ __html: modifiedLyrics }}>
                </div>
            </div>

            <RelatedSongs data={data?.song_recommendations?.recommendations} artistId="" isPlaying={isPlaying} activeSong={activeSong} 
            handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
        </div>
    )
}

export default SongDetails;
