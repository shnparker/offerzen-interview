import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import PageNotFound from "../modules/errors/NotFound";
import SomethingWentWrong from "../modules/errors/SomethingWentWrong";
import Forbidden from "../modules/errors/Forbidden";

interface ErrorStatusContextType {
  errorStatusCode: string;
  setErrorStatusCode: Dispatch<SetStateAction<string>>;
}

const ErrorStatusContext = createContext<ErrorStatusContextType | undefined>(undefined);

const ErrorHandlerProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const location = useLocation();
  const [errorStatusCode, setErrorStatusCode] = React.useState("");

  React.useEffect(() => {
    setErrorStatusCode("");
  }, [location]);

  const renderContent = () => {
    if (errorStatusCode === "404") {
      return <PageNotFound />;
    }

    if (errorStatusCode === "400") {
      return <SomethingWentWrong />;
    }

    if (errorStatusCode === "500") {
      return <SomethingWentWrong />;
    }

    if (errorStatusCode === "403") {
      return <Forbidden />;
    }

    return children;
  };

  const value = useMemo<ErrorStatusContextType>(() => ({ errorStatusCode, setErrorStatusCode }), [
    errorStatusCode,
    setErrorStatusCode,
  ]);

  return <ErrorStatusContext.Provider value={value}>{renderContent()}</ErrorStatusContext.Provider>;
};

function useErrorStatus(): ErrorStatusContextType {
  const context = useContext(ErrorStatusContext);

  if (context === undefined) {
    throw new Error(`useErrorStatus must be used within a ErrorStatusContext`);
  }

  return context;
}

export { ErrorHandlerProvider, useErrorStatus };
