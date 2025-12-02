export type Contest = {
  id: string;
  name: string;
  platform: string;
  date: string; // ISO string
  time: string; // ISO string or same as date
  duration: string; // human-readable
  status: 'Upcoming' | 'ongoing' | 'Finished' | string;
  relativeTime?: string;
  url: string;
  solution?: string | null;
};

export default Contest;
