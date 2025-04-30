import { redirect } from "next/navigation";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Participant } from "@/components/events/Participants";
import { InfoTab } from "@/components/events/InfoTab";
import Link from "next/link";
import TeamParticipant from "@/components/events/TeamParticipant";
import { Question } from "@/components/events/Question";

const QuizPage = async ({ event, searchParams }) => {
  // Check if participants array exists and contains 'team' property
  const hasTeamProperty = event.participants.some((participant) => {
    return participant?.team !== undefined;
  });

  // Group participants by teamname
  const groupedParticipants = {};
  if (hasTeamProperty) {
    event.participants.forEach((participant) => {
      const teamname = participant.team;

      if (!groupedParticipants[teamname]) {
        groupedParticipants[teamname] = [];
      }

      groupedParticipants[teamname].push(participant);
    });
  }

  const participants = hasTeamProperty
    ? Object.values(groupedParticipants)
    : event.participants;

  const activeTab = searchParams?.tab;

  const eventStartDate = new Date(event?.date);
  const eventEndDate = new Date(
    eventStartDate.getTime() + event?.duration * 60 * 60 * 1000
  );

  const tabs = [
    {
      label: "Info",
      icon: <AiOutlineInfoCircle className="fill-inherit shrink-0" size={25} />,
      href: `${event.slug}?tab=info`,
    },
    {
      label: "Problems",
      icon: (
        <AiOutlineQuestionCircle className=" fill-inherit shrink-0" size={25} />
      ),
      href: `${event.slug}?tab=problems`,
    },
    {
      label: "Winners",
      icon: (
        <HiOutlineUserGroup
          className="stroke-inherit shrink-0 -translate-y-1"
          size={25}
        />
      ),
      href: `${event.slug}?tab=winners`,
    },
  ];
  // Define a custom order of difficulty
  const difficultyOrder = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  return event ? (
    <div className="container-70 min-h-screen pt-10 flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between mb-6 gap-2">
          {tabs.map((tab, index) => {
            return (
              <Link
                replace={true}
                href={tab.href}
                key={index}
                className={`flex items-center justify-center gap-2 xs:p-2 p-4 flex-1 text-xl fill-primary-light stroke-primary-light ${
                  activeTab === tab.label.toLocaleLowerCase()
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
            );
          })}
        </div>
        {activeTab === "info" ? (
          <InfoTab event={event} />
        ) : activeTab === "problems" ? (
          <div className="flex flex-col w-full gap-4">
            {console.log(event.questions)}
            {event?.questions
              ?.sort(
                (a, b) =>
                  difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
              )
              ?.map((question) => {
                return (
                  <Question
                    key={question._id}
                    question={question}
                    eventEndDate={eventEndDate}
                  />
                );
              })}
          </div>
        ) : activeTab === "winners" ? (
          <ol className="flex flex-col w-full gap-4">
            {participants.length ? (
              hasTeamProperty ? (
                participants
                  .sort((a, b) => a[0].rank - b[0].rank)
                  .map((team, index) => {
                    return (
                      <TeamParticipant
                        key={index}
                        team={team}
                        contestId={event._id.toString()}
                      />
                    );
                  })
              ) : (
                participants
                  .sort((a, b) => a.rank - b.rank)
                  .map((participant) => {
                    return (
                      <Participant
                        contestId={event._id.toString()}
                        participant={participant?.user}
                        rank={participant?.rank}
                        team={participant?.team}
                        key={participant?._id}
                      />
                    );
                  })
              )
            ) : (
              <h4 className="text-accent text-lg font-semibold text-center">
                Winners list not available.
              </h4>
            )}
          </ol>
        ) : (
          redirect(`${event.slug}?tab=info`)
        )}
      </div>
    </div>
  ) : (
    <div className="">
      <h1>No Event Found</h1>
    </div>
  );
};

export default QuizPage;
