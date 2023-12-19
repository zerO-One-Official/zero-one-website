"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import Styles from '@/components/teams/Team.module.css';
import TeamCard from '@/components/teams/TeamsCard';
import { TeamData } from '@/lib/data/TeamData';

function Teams() {
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
            <h2 className={Styles.postHead}>2023</h2>
            <div className={Styles.cardContainer}>
                {TeamData.map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`${item.imageSrc}`}
                            lazyImageSrc={`${item.imageSrc}`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Teams;
