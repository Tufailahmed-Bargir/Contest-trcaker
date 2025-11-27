import prisma from '@/lib/prisma';
import axios from 'axios';

// interface Contest {
//   name: string;
//   platform: string;
//   date: string;
//   time: string;
//   duration: string;
//   status: string;
//   relativeTime: string;
//   url: string;
// }

interface CodeChefAPIResponse {
  past_contests: {
    contest_name: string;
    contest_start_date_iso: string;
    contest_end_date_iso: string;
    contest_duration: string;
    contest_code: string;
  }[];
}

// const getRelativeTime = (startTime: Date, now: Date): string => {
//   const diff = startTime.getTime() - now.getTime();
//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//   return diff > 0 ? `Starts in ${hours} hr ${minutes} min` : "Started";
// };

export const fetchAndStoreCodeChefContests = async () => {
  try {
    const response = await axios.get<CodeChefAPIResponse>(
      "https://competeapi.vercel.app/contests/codechef/"
    );

    const now = new Date();
    const contests = response.data.past_contests.map((contest) => {
      const startTime = new Date(contest.contest_start_date_iso);
      const endTime = new Date(contest.contest_end_date_iso);

      let status: string;
      if (now < startTime) {
        status = "Upcoming";
      } else if (now >= startTime && now <= endTime) {
        status = "Ongoing";
      } else {
        status = "Finished";
      }

      const durationMinutes = parseInt(contest.contest_duration, 10);
      const durationHours = Math.floor(durationMinutes / 60);
      const remainingMinutes = durationMinutes % 60;
      const formattedDuration = `${durationHours} hr ${remainingMinutes} min`;

      return {
        name: contest.contest_name,
        platform: "CodeChef",
        date: startTime.toISOString(),
        time: startTime.toISOString(),
        duration: formattedDuration,
        status,
        url: `https://www.codechef.com/${contest.contest_code}`,
      };
    });

    // Insert contests into the database using Prisma
    for (const contest of contests) {
      await prisma.contest.upsert({
        where: { url: contest.url },
        update: contest,
        create: contest,
      });
    }

    console.log("Contests added to the database.");
  } catch (error) {
    console.error("Error fetching contests from CodeChef API:", error);
  }
};
 
