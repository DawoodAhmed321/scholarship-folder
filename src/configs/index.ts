import { HiLogout } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { LuFacebook, LuInstagram, LuLayoutDashboard } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { RiTwitterXFill } from "react-icons/ri";
import { TbHomeEdit } from "react-icons/tb";
import { TfiGift } from "react-icons/tfi";

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

export const APP_ROUTES = {
  ABOUT: "/about-us",
  CONTACT: "/contact-us",
  OFFERS: "/offers",
  SCHOLARSHIPS: "/scholarships",
  HOME: "/",
  TESTIMONIALS: (id: string | number) => `/testimonials/${id}`,

  ADMIN_DASHBOARD: "/admin/dashboard",
  HOME_PAGE: "/admin/home-page",
  ADMIN_LOGIN: "/admin/login",

  GET_IN_TOUCH_MAILS: "/admin/get-in-touch",
  JOIN_TEAM_MAILS: "/admin/join-team",

  ADMIN_TESTIMONIALS: `/admin/testimonials/`,
  ADMIN_OFFERS: `/admin/offers`,
  ADMIN_SCHOLARSHIPS: `/admin/scholarships`,
};

export const DASHBOARD_MODULE = [
  {
    title: "Menu",
    subMenu: [
      {
        id: 1,
        title: "Dashboard",
        link: APP_ROUTES.ADMIN_DASHBOARD,
        Icon: LuLayoutDashboard,
      },
      {
        id: 2,
        title: "Offers",
        link: APP_ROUTES.ADMIN_OFFERS,
        Icon: TfiGift,
      },
      {
        id: 3,
        title: "Scholarships",
        link: APP_ROUTES.ADMIN_SCHOLARSHIPS,
        Icon: IoSchoolOutline,
      },
      {
        id: 4,
        title: "Testimonials",
        link: APP_ROUTES.ADMIN_TESTIMONIALS,
        Icon: VscFeedback,
      },
    ],
  },
  {
    title: "Settings",
    subMenu: [
      {
        id: 4,
        title: "Web Home",
        link: APP_ROUTES.HOME_PAGE,
        Icon: TbHomeEdit,
      },
      {
        id: 5,
        title: "Logout",
        link: APP_ROUTES.HOME_PAGE,
        Icon: HiLogout,
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/350?img=1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 2,
    name: "Syed Saad",
    image: "https://i.pravatar.cc/350?img=2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 3,
    name: "Dawood Ahmed",
    image: "https://i.pravatar.cc/350?img=3",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 4,
    name: "Syed Saad",
    image: "https://i.pravatar.cc/350?img=4",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },

  {
    id: 5,
    name: "Marry Doe",
    image: "https://i.pravatar.cc/350?img=1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 6,
    name: "Taha Khan",
    image: "https://i.pravatar.cc/350?img=2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 7,
    name: "Sasuke Uchiha",
    image: "https://i.pravatar.cc/350?img=3",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 8,
    name: "Naruto Uzumaki",
    image: "https://i.pravatar.cc/350?img=4",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 9,
    name: "Sakura Haruno",
    image: "https://i.pravatar.cc/350?img=1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 10,
    name: "Madara Uchiha",
    image: "https://i.pravatar.cc/350?img=2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 11,
    name: "Nagato Uzumaki",
    image: "https://i.pravatar.cc/350?img=3",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 12,
    name: "Itachi Uchiha",
    image: "https://i.pravatar.cc/350?img=4",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 13,
    name: "Sunade Senju",
    image: "https://i.pravatar.cc/350?img=1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 14,
    name: "Hashirama Senju",
    image: "https://i.pravatar.cc/350?img=2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 15,
    name: "Tobirama Senju",
    image: "https://i.pravatar.cc/350?img=3",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 16,
    name: "Jiraiya Senju",
    image: "https://i.pravatar.cc/350?img=4",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 17,
    name: "Hinata Hyuga",
    image: "https://i.pravatar.cc/350?img=1",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
  {
    id: 18,
    name: "Neji Hyuga",
    image: "https://i.pravatar.cc/350?img=2",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repellat.",
  },
];
