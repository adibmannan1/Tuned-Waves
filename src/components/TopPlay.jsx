import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/genius";
import 'swiper/css'
import 'swiper/css/free-mode'


const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className="bg-[#1f392c] w-full flex flex-row items-center my-2 pr-3 hover:bg-[#335745] rounded-[4px] cursor-pointer mb-2">
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song.header_image_url} alt={song?.title} className="w-16 h-16"/>
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="font-bold text-white text-lg">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song.primary_artist.id}`}>
          <p className="text-base text-gray-300 mt-1">{song?.primary_artist.name}</p>
        </Link>
      </div>
    </div>
    <PlayPause song={song} isPlaying={isPlaying} activeSong={activeSong}
    handlePause={handlePauseClick} handlePlay={handlePlayClick}/>
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state)=>state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)



  useEffect(()=>{
    divRef.current.scrollIntoView({behavior: 'smooth'})
  })

  const topPlays = data?.chart_items.slice(0, 4);
  const topArtists = data?.chart_items.slice(0, 10);

  // functions of the play pause buttons
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full sm:flex hidden flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Albums</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer sm:block hidden">See More...</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i)=>(
            <TopChartCard key={song?.item.id} song={song?.item} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={()=>handlePlayClick(song?.item, i)}/>
          ))}
        </div>
      </div>

      <div className="w-full sm:flex hidden flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base  cursor-pointer">See More...</p>
            </Link>
        </div>

        <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]}
        className="mt-4">
          {topArtists?.map((song, i)=>(
            <SwiperSlide key={song?.item.id} style={{width: '25%', height: 'auto'}} className="shadow-lg rounded-full
            animate-slideright">
              <Link to={`/artists/${song?.item.primary_artist.id}`}>
                <img src={song?.item.primary_artist.image_url} alt="name" className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )

}

export default TopPlay;
