import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { newNftImage, setModalOpen } from "../atoms/modalAtom";
import Image from "next/image";

const Popover = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(setModalOpen);
  const nftImage = useRecoilValue(newNftImage);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-200 shadow-xl rounded-2xl'>
                <div className='flex justify-center w-full flex-col items-center'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Congratulations
                  </Dialog.Title>
                  <div className='mt-2'>
                    <div className='p-2 h-[200px] w-[220px] bg-gradient-to-br from-zinc-500 to-amber-500 rounded-md'>
                      <Image
                        src={nftImage || ""}
                        alt=''
                        height={200}
                        width={220}
                      />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 border border-transparent rounded-md hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      onClick={() => setIsOpen(false)}
                    >
                      Back for more
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Popover;

{
  /* <Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  className='fixed z-10 inset-0 overflow-y-auto'
>
  <div className='flex items-center justify-center min-h-screen'>
    <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

    <div className='relative bg-white rounded max-w-xl mx-auto'>
      <Dialog.Title>Your new NFT!</Dialog.Title>
      <div className='h-32 w-36'>
        <Image src={nftImage || ""} alt='' layout='fill' />
      </div>
      <Dialog.Description>AWESOME</Dialog.Description>
    </div>
  </div>
</Dialog>; */
}
