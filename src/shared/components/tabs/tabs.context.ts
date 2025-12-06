import { createContext, useContext } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

//Custom hook
export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs.Tab must be used within Tabs");
  }
  return context;
};
