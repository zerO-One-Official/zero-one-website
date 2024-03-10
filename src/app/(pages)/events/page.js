"use client"
import useScroll from '@/hooks/useScroll';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr'
import Spinner from '@/components/loader/Spinner';
import toast from 'react-hot-toast'
import Link from 'next/link'
import { getMonthName, getTime } from '@/utils/helper';

export default function Events() {


  const fetcher = url => fetch(url).then(r => r.json());

  const { data, error, isLoading } = useSWR('/api/events', fetcher);

  if (error) return toast.error(error.message);

  return (
    <div className='container-70'>
      <section className={`flex xl:flex-col flex-auto my-40 sm:my-20`}>
        <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
          <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Events</h2>
        </div>
        <div className={`text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0`}>
          Zero One Coding Club hosts fun events like workshops, hackathons, and contests. These help us learn and have a good time. We get to improve our coding skills, be creative in hackathons, and enjoy friendly contests. It&apos;s a cool place for both beginners and coding fans!
        </div>
      </section>
      <div className="flex flex-col gap-10">
        {
          isLoading ?
            <Spinner />
            :
            data && data.events ?
              <>
                <OnGoingEvent events={data?.events} />
                <Upcoming events={data?.events} />
                <Past events={data?.events} />
              </>
              : null
        }
      </div>
    </div>
  );
}


const OnGoingEvent = ({ events }) => {

  const ref = useRef();

  useScroll(ref);

  const [timers, setTimers] = useState([]);
  const [remainingTime, setRemainingTime] = useState(
    {
      hours: '',
      minutes: '',
      seconds: ''
    }
  );

  const currentDate = new Date();
  useEffect(() => {
    // Clear existing timers
    timers.forEach(timer => clearInterval(timer));

    // Create new timers for ongoing events
    const newTimers = events?.map((event) => {
      const eventStartDate = new Date(event.date);
      const eventEndDate = new Date(eventStartDate.getTime() + event.duration * 60 * 60 * 1000);

      // Calculate remaining time only if the event hasn't ended
      if (eventEndDate > currentDate) {
        return setInterval(() => {
          const timeRemaining = eventEndDate - new Date();

          const hours = Math.max(0, Math.floor(timeRemaining / (60 * 60 * 1000)));
          const minutes = Math.max(0, Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000)));
          const seconds = Math.max(0, Math.floor((timeRemaining % (60 * 1000)) / 1000));

          setRemainingTime({ hours, minutes, seconds })
        }, 1000);
      } else {
        return null; // Return null for ended events
      }
    }).filter(timer => timer !== null); // Filter out null timers

    // Set the new timers in state
    setTimers(newTimers);

    // Clear the timers when the component unmounts
    return () => {
      newTimers.forEach(timer => clearInterval(timer));
    };
  }, [events]);

  const onGoingEvents = events && events.filter(event => {
    const eventStartDate = new Date(event.date);
    const eventEndDate = new Date(eventStartDate.getTime() + event.duration * 60 * 60 * 1000);

    return eventStartDate <= currentDate && currentDate <= eventEndDate;
  });


  return (
    onGoingEvents.length ?
      <section ref={ref} className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll`}>
        <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
          <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Ongoing</h2>
        </div>

        <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
          {
            onGoingEvents.map((event) => (
              <Link href={`/events/${event.name}?tab=info`} key={event._id} className="flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
                <h2 className=' text-accent font-semibold text-4xl sm:text-xl'>{event.name}</h2>
                <h2 className='flex gap-6 sm:gap-2'>{remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</h2>
              </Link>
            ))
          }
        </div>
      </section>
      :
      null
  );
};


const Upcoming = ({ events }) => {
  const ref = useRef();

  useScroll(ref);

  const currentDate = new Date();

  const upcomingEvents = events && events?.filter(event => new Date(event.date) > currentDate)


  return (
    <section ref={ref} className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll`}>
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Upcoming</h2>
      </div>

      {
        upcomingEvents.length ?
          <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
            {
              upcomingEvents.map(event => {
                const eventDate = new Date(event.date)
                return (
                  <Link href={`/events/${event.name}?tab=info`} key={event._id} className="group bg-white/5 border border-white/10 hover:scale-105 transition-all rounded flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
                    <h2 className=' text-accent font-medium text-3xl sm:text-xl'>{event.name}</h2>
                    <h2 className='flex gap-6 sm:gap-2'>
                      <span>
                        {`${eventDate.getDate()} ${getMonthName(eventDate)} ${eventDate.getFullYear()}`}
                      </span>
                      <span>
                        {`${getTime(eventDate)}`}
                      </span>
                    </h2>
                  </Link>
                )
              })
            }
          </div>
          :
          <div className="flex items-center justify-center w-3/5 xl:w-full xl:mt-16">
            <h3 className='text-accent text-2xl font-light'>No Upcoming Events</h3>
          </div>
      }

    </section>

  )
}


const Past = ({ events }) => {
  const ref = useRef();

  useScroll(ref);

  const currentDate = new Date();

  const pastEvents = events && events?.filter(event => {
    const eventStartDate = new Date(event.date);
    const eventEndDate = new Date(eventStartDate.getTime() + event.duration * 60 * 60 * 1000);
    return eventEndDate < currentDate;
  });

  return (
    <section ref={ref} className={`flex xl:flex-col flex-auto my-40 sm:my-20 fadeonscroll`}>
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>Past</h2>
      </div>
      {
        pastEvents.length ?
          <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
            {
              pastEvents.map(event => {
                const eventDate = new Date(event.date)
                return (
                  <Link href={`/events/${event.name}?tab=info`} key={event._id} className="group bg-white/5 border border-white/10 hover:scale-105 transition-all rounded flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 ">
                    <h2 className=' text-accent font-medium text-3xl sm:text-xl'>{event.name}</h2>
                    <h2 className='flex gap-6 sm:gap-2'>{`${eventDate.getDate()} ${getMonthName(eventDate)} ${eventDate.getFullYear()}`}</h2>
                  </Link>
                )

              })
            }
          </div>
          :
          <div className="flex items-center justify-center w-3/5 xl:w-full xl:mt-16">
            <h3 className='text-accent text-2xl font-light'>No Past Events</h3>
          </div>
      }

    </section>

  )
}