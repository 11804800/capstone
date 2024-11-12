import { useDispatch, useSelector } from "react-redux";
import { Subscribe, UnSubscribe } from "../Redux/UserSlice";
import axios from "axios";


//resubale component
function SubscribeComponent({ channels, channelId }) {

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.user.token;
  });

  const user=useSelector((state)=>{
    return state.user.user
  });

  //subscribing the channel
  async function SubScribeChannel() {
    try {
      const body = {
        id: channelId,
      };
      const res = await axios.post(
        `http://localhost:3000/user/${user}/subscribe`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          body,
        }
      );
      dispatch(Subscribe(channelId));
    } catch (err) {
      console.log(err);
    }
  }

  //subscribing the channel
  async function UnSubScribeChannel() {
    try {
      const res = await axios.delete(
        `http://localhost:3000/user/${user}/unsubcribe/${channelId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      dispatch(UnSubscribe(channelId));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {!channels?.includes(channelId) ? (
        <button
          className="bg-black text-white text-sm w-full  justify-center rounded-3xl px-4 py-2 font-semibold shadow-md"
          onClick={SubScribeChannel}
        >
          Subscribe
        </button>
      ) : (
        <button
          className="bg-zinc-200 border text-sm w-full justify-center rounded-3xl px-4 py-2 font-semibold shadow-md "
          onClick={UnSubScribeChannel}
        >
          UnSubscribe
        </button>
      )}
    </>
  );
}
export default SubscribeComponent;
