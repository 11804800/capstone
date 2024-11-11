import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function VideoListComponent() {
  //getting the data from videoslice
  const videos = useSelector((state) => {
    return state.media.videos;
  });

  return (
    <>
      {!videos ? (
        <div className="flex flex-col gap-4 pt-12 w-full justify-center items-center">
          <div className="p-12 border shadow-lg flex flex-col gap-4 w-[80%] justify-center items-center">
            <p className="text-2xl roboto-medium">
              Please Login To Browse Videos
            </p>
            <Link
              to="/login"
              className="flex px-2 font-semibold text-blue-700 py-1 border-2 rounded-2xl items-center text-sm min-w-fit hover:text-[brown] w-fit active:text-blue-700"
            >
              <HiOutlineUserCircle size={21} />
              Sign In
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-12 w-full"></div>
      )}
    </>
  );
}
export default VideoListComponent;
