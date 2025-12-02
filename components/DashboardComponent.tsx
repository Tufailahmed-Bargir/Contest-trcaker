 
// import { ContestCard } from "./Card";
// import prisma from "@/lib/prisma";
// import { SearchComponent } from "./Dashboard/searchbar";
// import { FilterComponent } from "./Dashboard/filterComponent";
// import { BookmarkComponent } from "./Dashboard/Bookmart";

 

// export   async function DashboardComponent() {
//     const data = await prisma.contest.findMany()
     
    
//   return (
//     <div className="container mx-auto px-4 py-8">
      
//       <div className="flex flex-col m-20 justify-center items-center">

      
//         <h1 className="text-4xl font-bold mb-2">Coding Contest Tracker</h1>
//         <p className="text-lg text-foreground/70">
//           Track upcoming and past coding contests from popular platforms
//         </p>
//         </div>
     

// <div className="flex gap-4 mx-2 px-2 ">


// <SearchComponent />
// <FilterComponent />
// <BookmarkComponent/>
// </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
//      {/* @ts-expect-error some-type-error */}
//     {data.map((contest, index)=>{
//         console.log('contests are mapped', contest);
        
//         return <ContestCard contest={contest} index={index} key={contest.id} />
//     })}
       
// </div>
//     </div>
//   );
// }


import axios from 'axios';
import { ContestCard } from "./Card";
import type { Contest } from '@/types/contest';
 

export async function DashboardComponent() {
  let data: Contest[] = [];
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
 

  try {
    const res = await axios.get(`${BASE_URL}/api/contests`);
    const result = res.data;
    data = (result?.contests ?? []) as Contest[];

   
   
  } catch (err: unknown) {
    // If the server can't reach the internal endpoints (network error), log for debugging and keep `data` as empty
    console.error('Error retrieving contests from API (axios):', (err as Error)?.message ?? String(err));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col m-20 justify-center items-center">
        <h1 className="text-4xl font-bold mb-2">Coding Contest Tracker</h1>
        <p className="text-lg text-foreground/70">
          Track upcoming and past coding contests from popular platforms
        </p>
      </div>

      {/* Search, Filter, and Bookmark Section */}
      <div className="flex gap-4 mx-2 px-2 mb-0">
        {/* <SearchComponent /> */}
        {/* <FilterComponent /> */}
        {/* <BookmarkComponent /> */}
      </div>

      {/* Contest Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        
        {data.map((contest: Contest, index: number) => {
          console.log("contests are mapped", contest);
          return <ContestCard contest={contest} index={index} key={contest.id} />;
        })}
      </div>
    </div>
  );
}
