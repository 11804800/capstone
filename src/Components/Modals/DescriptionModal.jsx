function DescriptionModal({ setVisible, uploadDate, description, views }) {
  return (
    <div className="w-full h-[100dvh] absolute top-0 left-0 flex gap-2 justify-center items-center bg-black/50 overflow-y-auto">
      <div className="flex flex-col h-[90%] justify-center items-center">
        <div className="bg-white w-[90%] md:w-[80%] rounded-t-lg roboto-medium justify-between flex p-2">
          <h1>Video Info</h1>
          <button className="text-3xl h-fit" onClick={()=>{
                         document.body.style.overflow="auto";
                         setVisible(false);
          }}>&times;</button>
        </div>
        <div className="bg-white rounded-b-lg p-4 w-[90%] md:w-[80%] overflow-y-auto No-Scrollbar1 h-[100%] flex flex-col gap-2">
          <div className="flex gap-4 p-2 text-sm roboto-medium">
            <p>{views} Views</p>
            <p>{uploadDate}</p>
          </div>
          <div className="py-2 text-sm px-1 roboto">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DescriptionModal;
