 
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


import { ContestCard } from "./Card";
import prisma from "@/lib/prisma";
import { fetchAndStoreCodeChefContests } from "@/lib/fetchALl";
import { SearchComponent } from "./Dashboard/searchbar";
import { FilterComponent } from "./Dashboard/filterComponent";
import { BookmarkComponent } from "./Dashboard/Bookmart";

export async function DashboardComponent() {
  let data = await prisma.contest.findMany();

  // If no contests are present, ingest from CodeChef and then re-query
  if (data.length === 0) {
    try {
      await fetchAndStoreCodeChefContests();
      data = await prisma.contest.findMany();
    } catch (error) {
      console.error("Error ingesting contests on Dash visit:", error);
    }
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
        {/* @ts-expect-error some-type-error */}
        {data.map((contest, index) => {
          console.log("contests are mapped", contest);
          return <ContestCard contest={contest} index={index} key={contest.id} />;
        })}
      </div>
    </div>
  );
}
