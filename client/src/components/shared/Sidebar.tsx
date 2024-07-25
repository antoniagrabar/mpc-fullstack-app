"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../icons";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <section className="light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-6 w-[266px]">
      <Image
        src="/assets/riteh_logo.png"
        alt="logo"
        width={0}
        height={0}
        className="w-full mb-12"
        sizes="100vw"
      />
      <div className="flex flex-1 flex-col gap-3 ">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          console.log("isactive", isActive);

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive ? "rounded-lg theme-gradient" : "bg-transparent"
              } 
              flex items-center gap-4 justify-start p-4`}
            >
              <Icon
                name={item.icon}
                fill="none"
                width={24}
                height={24}
                stroke={isActive ? "#fff" : "#000"}
              />
              <p
                className={`${
                  isActive ? "body-semibold text-white" : "body-medium"
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <Button
        onClick={handleLogout}
        className="w-full rounded-lg px-4 py-3 shadow-none text-theme bg-gray100 hover:bg-gray200 focus:bg-gray200 cursor-pointer"
      >
        Log Out
      </Button>
    </section>
  );
};

export default Sidebar;
