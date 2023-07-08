import useBillboard from "@/hooks/useBillboard";

import {AiOutlineInfoCircle} from 'react-icons/ai'
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  const {openModal} = useInfoModal()

  const handleOpenModal = useCallback(()=>{
    openModal(data?.id)
  },[openModal, data?.id])

  return (
    <div className="relative h-[45%] ">
      <video
        className="w-full h-[100%] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
      ></video>
      <div className="absolute top-[25%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-3xl h-full w-[50%] lg:text-5xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[6px] md:text-[14px] mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-md font-semibold flex flex-row items-center hover:bg-opacity-20 transition h-[35px]">

            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
