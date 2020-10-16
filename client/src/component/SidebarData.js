import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <AiIcons.AiFillContacts />,
    cName: "nav-text",
  },
  {
    title: "EduZone",
    path: "/educationZone",
    icon: <FaIcons.FaBookOpen />,
    cName: "nav-text",
  },
  {
    title: "Forum",
    path: "/forum",
    icon: <IoIcons.IoMdChatbubbles />,
    cName: "nav-text",
  },
];
