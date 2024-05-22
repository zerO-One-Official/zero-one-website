import { redirect } from "next/navigation";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Participant } from "@/components/events/Participants";
import { InfoTab } from "@/components/events/InfoTab";
import { Question } from "@/components/events/Question";
import { getEvent } from "@/action/event";
import Link from "next/link";
import Skeleton from "@/components/skeleton/skeleton";

const EventPage = async ({ params, searchParams }) => {
  const { eventName } = params;


  const event = await getEvent(eventName)

  const activeTab = searchParams?.tab;

  const eventStartDate = new Date(event?.date);
  const eventEndDate = new Date(
    eventStartDate.getTime() + event?.duration * 60 * 60 * 1000
  );

  const tabs = [
    {
      label: 'Info',
      icon: <AiOutlineInfoCircle className="fill-inherit shrink-0" size={25} />,
      href: `${eventName}?tab=info`
    },
    {
      label: 'Problems',
      icon: <AiOutlineQuestionCircle className=" fill-inherit shrink-0" size={25} />,
      href: `${eventName}?tab=problems`
    },
    {
      label: 'Participants',
      icon: <HiOutlineUserGroup className="stroke-inherit shrink-0 -translate-y-1" size={25} />,
      href: `${eventName}?tab=participants`
    }
  ]

  return event ? (
    <div className="container-70 min-h-screen pt-10 flex flex-col">

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between mb-6 gap-2">
          {
            tabs.map((tab, index) => {
              return (
                <Link href={tab.href} key={index}
                  className={`flex items-center justify-center gap-2 xs:p-2 p-4 flex-1 text-xl fill-primary-light stroke-primary-light ${activeTab === tab.label.toLocaleLowerCase()
                    ? "bg-white/5 border border-white/5 shadow-cus"
                    : "border-transparent"
                    } rounded-3xl`}
                  title={tab.label}
                >
                  {tab.icon}
                  <label className="text-inherit font-medium sm:hidden pointer-events-none">
                    {tab.label}
                  </label>
                </Link>
              )
            })
          }
        </div>

        <div className="p-6 bg-white/5 border border-white/5 shadow-cus rounded-3xl ">
          {
            activeTab === "info" ? (
              <InfoTab event={JSON.stringify(event)} />
            ) :
              activeTab === "problems" ? (
                <div className="flex flex-col w-full gap-4">
                  {event?.questions.map((question) => {
                    return (
                      <Question
                        key={question._id}
                        question={JSON.stringify(question)}
                        eventEndDate={eventEndDate}
                      />
                    );
                  })}
                </div>
              ) :
                activeTab === "participants" ? (
                  <ol className="flex flex-col w-full gap-4">
                    {event?.participants.length ? (
                      event?.participants
                        .sort((a, b) => a.rank - b.rank)
                        .map((participant) => {

                          return (
                            <Participant
                              participant={JSON.stringify(participant?.user)}
                              rank={participant?.rank}
                              key={participant?._id}
                            />
                          );
                        })
                    ) : (
                      <div className="flex-1">
                        <p className="text-red-500 text-xl text-center">
                          Participant List Not Available
                        </p>
                      </div>
                    )}
                  </ol>
                ) :
                  (
                    redirect(`${eventName}?tab=info`)
                  )
          }
        </div>
      </div>
    </div>
  ) : (
    <div className="">
      <h1>No Event Found</h1>
    </div>
  );
};




export default EventPage;
