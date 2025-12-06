import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingIndicator } from "../components";

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      <div className="min-h-screen flex flex-col bg-linear-to-br from-pm-background to-pm-card/30">
        <Header />
        <main className="grow">
          {navigation.state === "loading" && <LoadingIndicator size="sm" />}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
