import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useMetamask,
  useDisconnect,
  useAddress,
  useNFTDrop,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import { BigNumber } from "ethers";
import { useRecoilState } from "recoil";
import { newNftImage, setModalOpen } from "../../atoms/modalAtom";
import Popover from "../../components/Popover";

interface Props {
  collection: Collection;
}

const NFTDropPage = ({ collection }: Props) => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(setModalOpen);
  const [newNFT, setNewNFT] = useRecoilState<string>(newNftImage);
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [ethPrice, setEthPrice] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const address = useAddress();
  const nftDrop = useNFTDrop(collection.address);

  const connectToMetamask = useMetamask();
  const disconnectFromMetmask = useDisconnect();

  useEffect(() => {
    if (!nftDrop) return;
    const fetchConditions = async () => {
      const conditions = await nftDrop.claimConditions.getAll();
      setEthPrice(conditions[0].currencyMetadata.displayValue);
    };

    fetchConditions();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;

    const fetchData = async () => {
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const totalNFTSupply = await nftDrop.totalSupply();

      setClaimedSupply(claimed.length);
      setTotalSupply(totalNFTSupply);
      setLoading(false);
    };

    fetchData();
  }, [nftDrop, claimedSupply]);

  const claimNFT = () => {
    if (!nftDrop || !address) return;
    setLoading(true);
    const notification = toast.loading("Mint Loading...");

    const quantity = 1;
    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt;
        const claimId = tx[0].id;
        const claimedNFT = await tx[0].data();
        setNewNFT(claimedNFT.metadata.image as string);
        toast("SUCCESS!!", {
          duration: 8000,
        });
        console.log(claimedNFT);
      })
      .catch((err) => {
        toast("ERROR", { duration: 8000 });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsOpen(true);
        toast.dismiss(notification);
      });
  };

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-10'>
      <Toaster position='bottom-left' />
      {/* LEFT */}
      <div className='bg-gradient-to-br from-cyan-800 to-black lg:col-span-4'>
        <div className='flex flex-col items-center justify-center lg:h-screen py-2'>
          <div className='bg-gradient-to-br from-purple-600 to-yellow-400 p-2 rounded-xl'>
            <div className='w-44 h-44 lg:w-60 lg:h-60 rounded-full relative'>
              <Image
                src={urlFor(collection.mainImage).url()}
                alt=''
                layout='fill'
              />
            </div>
          </div>
          <div className='text-white text-center py-5'>
            <h1 className='text-2xl font-bold lg:text-3xl '>
              {collection.nftCollectionName}
            </h1>
            <p>{collection.description}</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className='lg:col-span-6 flex flex-col flex-1 p-10 justify-center items-center'>
        <div className='flex justify-between items-center bg-slate-200 px-6 py-2 rounded-lg'>
          <Link href={"/"} passHref>
            <h1 className='w-52 cursor-pointer fontextralight text-xl lg:text-2xl hover:text-gray-500'>
              <span className='font-bold'>CRAZY APES</span> NFT Marketplace
            </h1>
          </Link>
          <button
            onClick={() =>
              address ? disconnectFromMetmask() : connectToMetamask()
            }
            className='rounded-full px-3 py-2 text-xs bg-slate-400 lg:px-5 lg:py-3 text-white lg:text-base'
          >
            {address ? "Sign Out" : "Sign in"}
          </button>
        </div>

        <hr className='border border-cyan-100 mt-5' />
        <p className='text-xs text-red-500'>Currently supports Metamask only</p>
        {address ? (
          <p className='text-xs text-red-500 text-center'>
            Logged in with wallet ${address.substring(0, 5)}...
          </p>
        ) : (
          <p></p>
        )}

        {/* CENTER */}

        <div className='flex flex-col mt-14 items-center lg:mt-24 space-y-6'>
          <div className='w-72 h-40 lg:w-60 lg:h-40 pb-10 relative'>
            <Image src={"/moon.png"} alt='' layout='fill' />
          </div>
          <div className='mt-3 text-center'>
            <h1 className='text-3xl font-bold'>
              {collection.nftCollectionName}{" "}
              <span className='font-mono'>Web3.0</span> | NFT DROP
            </h1>
            {loading ? (
              <p className='text-sm text-red-600 animate-bounce'>
                Loading claims...
              </p>
            ) : (
              <p className='text-sm text-red-600'>
                {claimedSupply}/{totalSupply?.toString()} NFT's claimed
              </p>
            )}
          </div>
        </div>
        <button
          onClick={claimNFT}
          disabled={claimedSupply == totalSupply?.toNumber() || !address}
          className='disabled:bg-gray-400 h-16 w-3/4  bg-cyan-800/90 hover:bg-cyan-800/70 mt-10 rounded-xl text-white font-semibold'
        >
          {loading ? (
            <>Loading...</>
          ) : !address ? (
            <>Sign in to mint</>
          ) : (
            <>
              Mint NFT <span className='text-xs'>({ethPrice} ETH)</span>
            </>
          )}
        </button>
      </div>
      <Popover />
    </div>
  );
};

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == 'collection' && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
  nftCollectionName,
    slug{
    current
  },
    mainImage{
    asset
  },
    creator->{
     _id,
    name,
    address,
    slug{
    current
  }
  }
  }`;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
