import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/genius';

const Search = () => {
  const {searchTerm} = useParams()
  const {activeSong, isPlaying} = useSelector((state)=>state.player)
  const {data} = useGetSongsBySearchQuery(searchTerm)
  const songs = data?.hits?.map((song)=>{song?.result})
  console.log(data)

  return(
      <div className='flex flex-col'>
          <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Showing Result for 
          <span className='font-black'> {searchTerm}</span></h2>
          <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.hits?.map((song, i)=> (
              <SongCard key={song?.result?.id} song={song?.result} isPlaying={isPlaying} activeSong={activeSong} 
              data={song?.result} i={i}/>
            ))}
        </div>
      </div>
  )
}

export default Search;
