import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/genius';

const TopCharts = () => {
    const {activeSong, isPlaying} = useSelector((state)=>state.player)
    const {data, isFetching, error} = useGetTopChartsQuery()
    // console.log(data)

    return(
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Explore Top Charts</h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.chart_items?.map((song, i)=> (
                    <SongCard key={song.item.id} song={song.item} isPlaying={isPlaying} activeSong={activeSong} 
                    data={data?.chart_items} i={i}/>
                ))}
            </div>
        </div>
    )
}

export default TopCharts;
