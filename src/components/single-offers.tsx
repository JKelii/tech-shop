"use client";

const SingleOffers = () => {
  return (
    <main className="flex justify-around items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16">
        <article className="bg-mainBg size-64 rounded-md flex justify-center items-center"></article>
        <div className="bg-mainBg size-64 rounded-md">
          <article className="bg-mainBg size-64 rounded-md flex justify-center items-center"></article>
        </div>
        <div className="bg-mainBg size-64 rounded-md">
          <article className="bg-mainBg size-64 rounded-md flex justify-center items-center"></article>
        </div>
        <div className="bg-mainBg size-64 rounded-md">
          <article className="bg-mainBg size-64 rounded-md flex justify-center items-center"></article>
        </div>
      </div>
    </main>
  );
};

export default SingleOffers;
