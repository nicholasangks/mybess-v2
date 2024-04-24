'use client'

import { useEffect } from "react";
import { api } from "@/helpers/apiHelper";

export default function Home() {

  // const init = async () => {
  //   // let res = await api("/generalinfo", "GET");
  //   const res = await fetch('https://prolintas1.mybess.com.my/v2/generalinfo', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Token 29d4c682a6c0748257a233c4a76a2e79b75b98e8',
  //     },
  //   });


  //   console.log(res)
  // }

  const init = async () => {
    try {
      const res = await api('/bess1', 'GET');
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <main>
    </main>
  );
}
