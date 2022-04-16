import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";

interface Props {
  collections: Collection[];
}

const find = ({ collections }: Props) => {
  return (
    <div className='bg-black'>
      <div className='bg-black w-full flex h-10 items-center justify-end space-x-8 sticky top-0 z-10 shadow-md shadow-white/20'>
        <Link href={"/about"} passHref>
          <button className='text-white font-semibold'>About</button>
        </Link>
        <Link href={"/"} passHref>
          <button className='text-white font-semibold pr-6'>Home</button>
        </Link>
      </div>
      <div className='flex flex-col items-center max-w-7xl mx-auto py-20 px-10 bg-gradient-to-br from-neutral-800 to-black bg-cover'>
        <main className='bg-slate-100/60 px-10 pt-10 pb-5 shadow-xl shadow-blue-500/60 rounded-sm'>
          <div className='grid space-x-3  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {collections.map((collection) => (
              <Link
                key={collection._id}
                href={`/nft/${collection.slug.current}`}
                passHref
              >
                <div className='flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-75 ease-in-out mb-6 group'>
                  <div className='bg-gradient-to-br from-cyan-300 to-gray-800 p-2 rounded-md'>
                    <div className='w-32 h-32 relative'>
                      <Image
                        className='rounded-md'
                        alt=''
                        src={urlFor(collection.mainImage).url()}
                        layout='fill'
                      />
                    </div>
                  </div>
                  <div className='text-center'>
                    <h2 className='font-semibold text-2xl'>
                      {collection.nftCollectionName}
                    </h2>
                    <p className='text-gray-800 font-semibold group-hover:underline'>
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default find;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
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

  const collections = await sanityClient.fetch(query);

  return {
    props: {
      collections,
    },
  };
};
