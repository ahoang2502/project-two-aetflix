import axios from "axios";
import { AiOutlinePlus , AiOutlineCheck} from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { useCallback, useMemo } from "react";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`, { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", {
        movieId,
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
        ...currentUser, favoriteIds: updatedFavoriteIds
    })

    mutateFavorites()
  }, [movieId,isFavorite,currentUser,mutate,mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck:AiOutlinePlus

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon size={25} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
