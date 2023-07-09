import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/genius";
import { useSelector } from "react-redux";

const Discover = () => {
    const {activeSong, isPlaying} = useSelector((state) => state.player)
    const {data, isFetching, error} = useGetTopChartsQuery();
    if(isFetching) return  <Loader title="Loading..."/>
    if(error) return  <Error/>

    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Explore Songs</h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data.chart_items?.map((song, i) => (
                    <SongCard key={song.item.id} song={song.item} i={i} isPlaying={isPlaying}
                    activeSong={activeSong} data={data}
                    />
                ))}
            </div>
        </div>
    )
}

export default Discover;
