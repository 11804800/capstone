import { useSelector } from "react-redux";
import VideoItemComponent from "./VideoitemComponent";

//for video history
function HistoryComponent()
{
    const history=useSelector((state)=>{
        return state.media.history
    });
    console.log(history);

    const video=useSelector((state)=>{
        return state.media.videos
    });

    return (
        <div className="flex flex-col gap-2 p-2 w-full h-full ">
            <h1 className="roboto-medium text-sm md:text-xl">Youtube History</h1>
            <div className="flex flex-wrap gap-5 py-4 px-2 w-full justify-center">
                {
                    history.map((item)=>{
                        return (
                            <div key={item}>
                                {
                                    video?.filter((elem)=>elem._id==item).map((val)=>{
                                        return <VideoItemComponent data={val} key={val?._id}/>
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default HistoryComponent;