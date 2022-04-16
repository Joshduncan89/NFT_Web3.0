import Link from "next/link";
import React from "react";
import Icons from "../components/Icons";

const about = () => {
  return (
    <div className='bg-black h-screen'>
      <div className=' w-full flex h-10 items-center justify-end space-x-8 sticky top-0 z-10 shadow-md shadow-white/20'>
        <Link href={"/"} passHref>
          <button className='text-white font-semibold pr-6'>Home</button>
        </Link>
      </div>
      <div className='bg-black w-screen text-white flex flex-col justify-center items-center'>
        <h1 className='mt-12 mb-10 lg:text-4xl md:text-4xl lg:mr-10 lg:mt-20cd lg:pr-14 text-2xl font-extralight text-center text-gray-300'>
          <span className='font-bold text-gray-300 underline'>Crazy APES</span>{" "}
          NFT Marketplace
        </h1>
        <h1 className='text-xl md:text-4xl text-red-200 font-semibold mb-8'>
          {" "}
          <span className='font-bold text-blue-400'>Discover</span> new NFTs
        </h1>

        <p className='mb-16'>A marketplace for affordable and stylish NFTs</p>
      </div>
      <div className='w-full rounded-t-md bg-slate-400 font-semibold text-black'>
        <div className='flex flex-col  bg-slate-400 pt-3 '>
          <div className='flex justify-evenly'>
            <div className='flex flex-col items-center space-y-1 p-6'>
              <h1 className=' text-slate-700'>FOLLOW</h1>
              <Icons />
            </div>
            <div className='text cursor-pointer space-y-1 p-6'>
              <h1 className=' cursor-auto text-slate-700'>SUPPORT</h1>
              <h3>Donate</h3>
              <h3>Documentation</h3>
              <h3>Api</h3>
              <h3>Reviews</h3>
            </div>
            <div className='spacing-y-1 cursor-pointer p-6'>
              <h1 className='cursor-auto text-slate-700'>LEGAL</h1>
              <h3>About</h3>
              <h3>Claim</h3>
              <h3>Privacy</h3>
              <h3>Terms</h3>
            </div>
          </div>
        </div>
        <hr className=' mx-auto max-w-xl' />
        <div className=' flex justify-center p-4'>
          <p className='text-sm'>© 2022 CRAZY APES NFT. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default about;
