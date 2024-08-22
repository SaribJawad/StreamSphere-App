import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  searchResultsSuccess,
  videoFailure,
  videoRequest,
} from "../features/video/videoSlice";

interface Video {
  _id: string;
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  duration: number;
  views: 1;
  owner: {
    _id: string;
    username: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    subscribersCount: number;
  };
  createdAt: string;
}

interface SearchResponse {
  statusCode: number;
  data: Video[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetSearchVideos = (searchQuery: string, shouldFetch: boolean) => {
  const dispatch = useAppDispatch();

  async function fetchSearchedVideos(searchQuery: string) {
    try {
      dispatch(videoRequest());
      const response = await fetch(
        `/api/v1/videos?page=1&limit=10&sortBy=createdAt&sortType=desc&query=${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(videoFailure(error.message));

        throw new Error(error.message);
      }
      const data: SearchResponse = await response.json();
      dispatch(searchResultsSuccess(data?.data));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(videoFailure(error.message));
        throw error;
      } else {
        dispatch(videoFailure("Error while fetching all videos"));
        throw "Error while fetching all videos";
      }
    }
  }

  return useQuery<SearchResponse, ErrorResponse>({
    queryKey: ["searchedVideos"],
    queryFn: () => fetchSearchedVideos(searchQuery),
    enabled: shouldFetch && !!searchQuery,
  });
};

export default useGetSearchVideos;
