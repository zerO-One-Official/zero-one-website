import { getTeams } from "@/action/team";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import Styles from "@/components/teams/Team.module.css";
import TeamCard from "@/components/teams/TeamsCard";

export const metadata = {
  title: "Teams",
  description:
    "Zero-one Coding Club of Motihari College of Engineering, Motihari",
};

export const dynamic = "force-dynamic";

async function Teams() {
  const { teams } = await getTeams();

  const groupedData = teams.reduce((result, current) => {
    const group = current.group === "founding members" ? "core members" : current.group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(current);
    return result;
  }, {});
  const groupOrder = ["directors", "core members", "current members", "past members"];
  const orderedGroups = [
    ...groupOrder.filter((group) => groupedData[group]),
    ...Object.keys(groupedData).filter((group) => !groupOrder.includes(group)),
  ];

  return (
    <section className="mt-16 mb-12 container-70">
      <div className="my-16 w-full text-center">
        <BottomGlitter text="Our Team" />
        <h3 className="text-lg mt-8">
          The strength of the team is each individual member. The strength of
          each member is the team.
          <br />- Phil Jackson
        </h3>
      </div>

      <div className="flex w-full flex-col gap-14 lg:items-center">
        {groupedData &&
          orderedGroups.map((group) => (
            <div key={group} className="w-full">
              <h2 className={Styles.postHead}>
                {group.replace(/\b\w/g, (character) => character.toUpperCase())}
              </h2>
              <div className={`${Styles.cardContainer}`}>
                {groupedData[group].map((team) => (
                  <TeamCard
                    key={team._id}
                    name={`${team.user.firstName} ${team.user.lastName}`}
                    username={team.user.username}
                    position={(team.roles?.length ? team.roles : [team.designation]).join(", ")}
                    imageSrc={`${team.user.profilePic}`}
                    gitHub={team.user.gitHub}
                    linkedIn={team.user.linkedIn}
                    email={team.user.email}
                    otherLinks={team.user.otherLinks}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Teams;
