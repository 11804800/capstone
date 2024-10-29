import { CgArrowLeft } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { MdMic } from "react-icons/md";

function SearchModal({setVisible}) {
 
  function Search()
  {
    alert("")
  }

  return (
    <div className="w-full h-[100dvh] absolute top-0 left-0 bg-white">
      <div className="w-full flex gap-2 p-2">
        <button className="p-2 text-zinc-600 active:bg-zinc-200 rounded-full">
          <CgArrowLeft size={21} onClick={()=>setVisible(false)}/>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border-2 rounded-3xl py-1 px-3 w-[90%]"
        />
        <button className="p-2 active:bg-zinc-200 rounded-full" onClick={Search}>
          <FiSearch size={21} />
        </button>
        <button className="p-2 bg-zinc-200 rounded-full">
          <MdMic size={21} />
        </button>
      </div>
    </div>
  );
}

export default SearchModal;