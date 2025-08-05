"use client";
// import { useEffect, useState } from "react";
// import { useProgressBar } from "../../components/common/PageProgressBar";
// import { Box } from "@mui/material";

// export default function FetchUserCard() {
//   const { start, finish } = useProgressBar();
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       start();
//       const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
//       const json = await res.json();
//       setData(json);
//       finish();
//     };
//     fetchData();
//   }, [start, finish]);

//   if (!data) return <p>Lade Daten...</p>;

//   return (
//     <Box
//       sx={{
//         background:
//           "linear-gradient(180deg, #F8F8FC, #6A4BBC, #4E3792, #6A4BBC, #F8F8FC,)",
//         height: "1000px",
//       }}
//     >
//       <div>
//         <h2>{data.name}</h2>
//         <p>{data.email}</p>
//       </div>
//     </Box>
//   );
// }

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function FetchUserCard() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, #F8F8FC, #6A4BBC, #4E3792, #6A4BBC, #F8F8FC,)',
        height: '1000px',
      }}
    >
      <div>
        <h2>Logs Page</h2>
        <p>Under Construction</p>
        {/* <p>Session: {JSON.stringify(session)}</p> */}
        <p> username: {JSON.stringify(session?.user.username)}</p>
        <p>email: {JSON.stringify(session?.user.email)}</p>
        <p>roles: {JSON.stringify(session?.user.roles)}</p>
        <p>userID: {JSON.stringify(session?.user.id)}</p>
        <p>profileID: {JSON.stringify(session?.user.profileId)}</p>
      </div>
    </Box>
  );
}
