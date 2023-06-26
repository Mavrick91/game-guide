import { useRouteError } from "react-router-dom";

type Error = {
  statusText?: string;
  message?: string;
};

const NotFound = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="h-full flex flex-col items-center justify-center text-white font-poppins gap-8">
      <h1 className="text-7xl">Oops!</h1>
      <p className="text-4xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default NotFound;
