import React from 'react';
import Image from 'next/image';
import AuthButtons from './AuthButtons';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {

  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) return redirect("/");


  return (
    <div className="bg-black flex h-screen w-full relative">
      <div
        className="flex-1 flex overflow-hidden relative justify-center items-center"
      >
        <div
          className="flex flex-col gap-0 xl:ml-40 text-center md:text-start font-semibold"
        >
          <Image
            src="/logo2.png"
            alt='Connect Now Logo'
            width={763}
            height={173}
            className='mt-5 w-[300px] z-0 pointer-events-none select-none'
          />
          <div className="landing-page">
            <div className="content">
              <div
                className="container flex items-center justify-between gap-[10px] min-h-[calc(102vh_-_80px)]"
              >
                <div className="info">
                  <h1 className='text-[#bbbbbb] text-[44px]'>
                    Connect with Friends and your Loved One in Real Time
                  </h1>
                  <p
                    className='leading-[1.6] text-[15px] text-[#b3b3b3] m-0'
                  >
                    From Quick Chats to Deep Conversations, We've got everything covered for you.
                  </p>
                  <AuthButtons />
                </div>
                <div className="max-w-full">
                  <img
                    className="w-[1500px] h-[450px]"
                    src='/HomePage.png'
                    alt="Main"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
