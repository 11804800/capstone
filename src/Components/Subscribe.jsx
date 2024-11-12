import { useDispatch, useSelector } from "react-redux";
import { Subscribe, UnSubscribe } from "../Redux/UserSlice";

function SubscribeComponent({ channels, channelId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.user.token;
  });

  //subscribing the channel
  async function SubScribeChannel() {
    try {
      const body = {
        id: params?.ChannelName,
      };
      const res = await axios.post(
        `http://localhost:3000/user/${user?.username}/subscribe`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          body,
        }
      );
      dispatch(Subscribe(params?.ChannelName));
    } catch (err) {
      console.log(err);
    }
  }

  //subscribing the channel
  async function UnSubScribeChannel() {
    try {
      const res = await axios.delete(
        `http://localhost:3000/user/${user?.username}/unsubcribe/${params?.ChannelName}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      dispatch(UnSubscribe(params?.ChannelName));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {!channels.includes(channelId) ? (
        <button
          className="bg-black text-white text-sm w-full  justify-center rounded-3xl px-4 py-2 font-semibold shadow-md"
          onClick={SubScribeChannel}
        >
          Subscribe
        </button>
      ) : (
        <button
          className="bg-[brown] text-white text-sm w-full justify-center rounded-3xl px-4 py-2 font-semibold shadow-md "
          onClick={UnSubScribeChannel}
        >
          unSubscribe
        </button>
      )}
    </>
  );
}
export default SubscribeComponent;
