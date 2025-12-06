import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TabsContext, useTabsContext } from "./tabs.context";
import { Button, Card } from "../ui";

type TabsProps = {
  children: React.ReactNode;
  defaultTab: string;
  syncWithUrl?: boolean;
};

//Main Wrapper Component => The Provider
export default function Tabs({
  children,
  defaultTab,
  syncWithUrl = true,
}: TabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTabState] = useState(tabParam || defaultTab);

  //Sync tab with URL
  const setActiveTab = useCallback(
    (tab: string) => {
      setActiveTabState(tab);
      if (syncWithUrl) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("tab", tab);
          return newParams;
        });
      }
    },
    [setSearchParams, syncWithUrl]
  );

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTabState(tabParam);
    }
  }, [tabParam, activeTab]);

  const ctxValue = useMemo(
    () => ({ activeTab, setActiveTab }),
    [activeTab, setActiveTab]
  );

  return (
    <TabsContext.Provider value={ctxValue}>{children}</TabsContext.Provider>
  );
}

//Tab Buttons Container
Tabs.List = function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 mb-6 p-1 bg-pm-card rounded-lg border border-pm-border">
      {children}
    </div>
  );
};

//Tab button
Tabs.Tab = function Tab({
  children,
  tabName,
  onMouseEnter,
}: {
  children: React.ReactNode;
  tabName: string;
  onMouseEnter?: () => void;
}) {
  const context = useTabsContext();
  const isActive = context.activeTab === tabName;

  return (
    <Button
      variant={isActive ? "primary" : "ghost"}
      size="sm"
      className={`flex-1 ${isActive ? "shadow-sm" : ""}`}
      onClick={() => context.setActiveTab(tabName)}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </Button>
  );
};

//Panel content Container
Tabs.Container = function TabContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="animate-pm-fade-in">{children}</Card>;
};

//Panel Content
Tabs.Panel = function TabPanel({
  children,
  tabName,
}: {
  children: React.ReactNode;
  tabName: string;
}) {
  const context = useTabsContext();
  //Only render children when the panel is active
  return context.activeTab === tabName ? (
    <div className="animate-pm-slide-up">{children}</div>
  ) : null;
};
