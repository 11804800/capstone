import { useRouteError,Link } from "react-router-dom";

function NotFoundPageComponent()
{
    const error=useRouteError();
    return (
        <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center ">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1  style={{ color: "rgb(1, 117, 172)" }}>
            OPPS!
          </h1>
        </div>
        <img src="/error.png" alt="error-image" className="object-contain" />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>{error.data}</p>
          <Link to="/" className="bg-[#fa9125] hover:bg-[#e36c07] active:bg-[#fa9125] roboto-medium text-sm shadow text-white px-5 py-2 rounded-md">
            HomePage
          </Link>
        </div>
      </div>
    )
}
export default NotFoundPageComponent;