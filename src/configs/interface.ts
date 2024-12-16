export type TContact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "INQUIRY";
};

export type TJoinTeam = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "JOIN_TEAM";
  file: {
    url: string;
  };
};

export type TOffer = {
  id: string | number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  image: {
    id: string | number;
    url: string;
  };
};

export type TScholarship = {
  id: string | number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  deadline: string;
  link: string;
  images: {
    id: string | number;
    url: string;
  }[];
};