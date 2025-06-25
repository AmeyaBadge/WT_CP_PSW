export type AnnouncmenetType = "Alert" | "Update" | "Notice";
export type Announcement = {
    _id?: string;
    type: AnnouncmenetType;
    content: string;
    date: string; // ISO string format
  };