import { useRouteError } from "react-router-dom";
const ErrorElement = ({ text }) => {
  const error = useRouteError();
  console.log(error);

  return (
    <h4 className="font-bold text-4xl">
      There was an Error... {error.message}
      <p className="">Check : {text}</p>
    </h4>
  );
};
export default ErrorElement;
