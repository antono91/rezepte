import { Loader2 } from "lucide-react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";


import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcome-msg";


export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-red-700 to-red-500
    px-4 py-8 lg:px-14 pb-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation/>
          </div>
            <ClerkLoading>
              <Loader2 className="animate-spin text-white" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton afterSwitchSessionUrl="/" />
            </ClerkLoaded>
        </div>
        <WelcomeMsg />
      </div>
      
    </header>
  );
};