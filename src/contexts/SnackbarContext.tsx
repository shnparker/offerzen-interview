import { createContext, useMemo, useCallback, ReactNode, useState, useContext } from "react";
import { Button } from "../components/lib";
import Snackbar from "../components/lib/Snackbar";
import { SnackbarMessage } from "../types";

type NewSnackbar = Omit<SnackbarMessage, "id" | "type">;

interface SnackbarContextType {
  newSuccessSnackbar: (content: NewSnackbar | string) => void;
  newErrorSnackbar: (content: NewSnackbar | string) => void;
  removeMessage: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

function SnackBarProvider({ children }: { children: ReactNode }): JSX.Element {
  const [alerts, setAlerts] = useState<SnackbarMessage[]>([]);

  const newSuccessSnackbar = useCallback((content: NewSnackbar | string) => {
    const snackbar = { id: Date.now(), type: "success" };

    if (typeof content === "string") {
      setAlerts((alerts) => [{ title: "", message: content, ...snackbar }, ...alerts]);
    } else {
      setAlerts((alerts) => [{ ...snackbar, ...content }, ...alerts]);
    }
  }, []);

  const newErrorSnackbar = useCallback((content: NewSnackbar | string) => {
    const snackbar = { id: Date.now(), type: "error" };

    if (typeof content === "string") {
      setAlerts((alerts) => [{ title: "", message: content, ...snackbar }, ...alerts]);
    } else {
      setAlerts((alerts) => [{ ...snackbar, ...content }, ...alerts]);
    }
  }, []);

  const removeMessage = useCallback((id) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  }, []);

  const value = useMemo<SnackbarContextType>(
    () => ({ newSuccessSnackbar, newErrorSnackbar, removeMessage }),
    [newSuccessSnackbar, newErrorSnackbar, removeMessage]
  );

  return (
    <SnackbarContext.Provider value={value}>
      <>
        {children}
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end flex-col sm:flex-col-reverse justify-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end sm:justify-end"
        >
          {alerts.length > 1 && (
            <Button className="rounded-full pointer-events-auto" onClick={() => setAlerts([])}>
              Clear all
            </Button>
          )}
          {alerts.map((alert) => (
            <Snackbar key={alert.id} alert={alert} onDismiss={() => removeMessage(alert.id)} />
          ))}
        </div>
      </>
    </SnackbarContext.Provider>
  );
}

function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a SnackbarContextProvider`);
  }

  return context;
}

export { SnackBarProvider, useSnackbar };
