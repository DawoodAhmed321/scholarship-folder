import { LuFacebook, LuInstagram } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";

export const NAVBAR_MENU = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 4,
    name: "About",
    link: "/about",
  },
  {
    id: 2,
    name: "Offers",
    link: "/offers",
  },
  {
    id: 3,
    name: "Scholarships",
    link: "/scholarships",
  },

  {
    id: 5,
    name: "Contact",
    link: "/contact",
  },
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    name: "@Saad",
    link: "https://www.facebook.com/",
    icon: LuFacebook,
  },
  {
    id: 2,
    name: "@SyedSaad",
    link: "https://www.instagram.com/",
    icon: LuInstagram,
  },
  {
    id: 3,
    name: "@SyedSaad",
    link: "https://www.twitter.com/",
    icon: RiTwitterXFill,
  },
];
