// "use client"
// import axios from "axios";
// import Logout from "@/app/logout/page";
// import React from "react";
// import toast from "react-hot-toast";
// import Link from "next/link";

// export default function ProfilePage() {
//   const [data, setData] = React.useState("nothing")

//   const getUserDetails = async() => {
//     try {
//       const res = await axios.get("/api/users/myprofile")
//       setData(res.data.data._id)
//       toast.success("user details fetched successfully")
//     } catch (error: any) {
//       toast.error("user details fetch failed");
//       console.log(error.message);
//     }
//   }

//   return (
//     <Logout>
//       <div className="flex w-full h-screen flex-col items-center justify-center">
//         <h1 className="typewriter">Profile</h1>
//         <p>Profile Page</p>
//         <button onClick={getUserDetails} className="bg-blue-600 px-5 py-2 hover:bg-blue-700 active:scale-95 cursor-pointer rounded-md mt-3">Get My Details</button>
//         <p className="mt-2 p-2 bg-amber-600 text-black rounded-md">{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</p>
//       </div>
//     </Logout>
//   );
// }

"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Logout from "../logout/page";
import Link from "next/link";

export default function ThreeDCardDemo() {
  return (
    <>
      <Logout />
      <div className="mt-18 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-8 w-[40%] justify-center items-center">
          <h1 className="text-3xl text-center font-bold my-4">Profile Page</h1>
          <Link
            className="bg-white px-5 py-2 text-black hover:bg-white/80 active:scale-95 rounded-md"
            href={"/profile/123"}
          >
            Go To Next Page
          </Link>
        </div>
        <div className="w-[60%]">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Make things float in air
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <img src="/search.png" className="w-6 h-6" />
                  <span className="text-center">Explore</span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </>
  );
}
