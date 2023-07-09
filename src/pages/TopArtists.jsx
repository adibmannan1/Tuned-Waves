import { useSelector } from 'react-redux';
import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/genius';

const TopArtists = () => {
    const {activeSong, isPlaying} = useSelector((state)=>state.player)
    const {data, isFetching, error} = useGetTopChartsQuery()
    // console.log(data)

    return(
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Trending Artists</h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-7'>
                {data?.chart_items?.map((track)=> (
                    <ArtistCard key={track?.item?.id} track={track?.item}/>
                ))}
            </div>
        </div>
    )
}

export default TopArtists;
