"use client"
import useScroll from '@/hooks/useScroll';
import { useEffect, useRef } from 'react';


export default function Events() {

  return (
    <div className='container-70'>
      <section className={`flex xl:flex-col flex-auto my-40 sm:my-20`} id='create'>
        <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
          <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Events</h2>
        </div>
        <div className={`text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0`}>
          Zero One Coding Club hosts fun events like workshops, hackathons, and contests. These help us learn and have a good time. We get to improve our coding skills, be creative in hackathons, and enjoy friendly contests. It&apos;s a cool place for both beginners and coding fans!
        </div>
      </section>
      <div className="flex flex-col gap-10">
        <OnGoingEvent />
        <Upcoming />
        <Past />
      </div>
    </div>
  );
}


const OnGoingEvent = () => {
  const ref = useRef();
  useScroll(ref);


  return (
    <section ref={ref} className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll`} id='create'>
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Ongoing</h2>
      </div>

      <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
        <div className=" border-t-2 border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
          <h2 className=' text-accent font-semibold text-4xl sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>00:34:00</h2>
        </div>
      </div>
    </section >

  )
}


const Upcoming = () => {
  const ref = useRef();

  useScroll(ref);
  return (
    <section ref={ref} className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll`} id='create'>
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Upcoming</h2>
      </div>

      <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
        <div className=" border-t-2 border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
          <h2 className=' text-accent font-semibold text-4xl sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023 <span>4:30 PM</span></h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023 <span>4:30 PM</span></h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023 <span>4:30 PM</span></h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023 <span>4:30 PM</span></h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023 <span>4:30 PM</span></h2>
        </div>
      </div>
    </section>

  )
}


const Past = () => {
  const ref = useRef();

  useScroll(ref);

  return (
    <section ref={ref} className={`flex xl:flex-col flex-auto my-40 sm:my-20 fadeonscroll`} id='create'>
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Past</h2>
      </div>

      <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
        <div className=" border-t-2 border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
          <h2 className=' text-accent font-semibold text-4xl sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023</h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023</h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023</h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023</h2>
        </div>
        <div className="border-b-2 border-dashed mt-3 flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2  pt-0">
          <h2 className=' text-accent font-semibold text-4xl  sm:text-xl'>Coder69</h2>
          <h2 className='flex gap-6 sm:gap-2'>17th Jan 2023</h2>
        </div>
      </div>
    </section>

  )
}