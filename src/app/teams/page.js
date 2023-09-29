"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import TeamCard from '@/components/teams/TeamCard';
import Styles from '@/components/teams/Team.module.css';
import { TeamData2kyx, TeamData2kyy, TeamData2kyz } from '@/lib/data/TeamData';

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
            <h2 className={Styles.postHead}>Board Of Directors</h2>
            <div className={Styles.cardContainer}>
                {TeamData2kyx.slice(0, 3).map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`/teams/2kyx/${item.imageSrc}.JPG`}
                            lazyImageSrc={`/teams/2kyx/lazy/${item.imageSrc}-min.jpg`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>

            <h2 className={Styles.postHead}>Post Bearers</h2>
            <div className={Styles.cardContainer}>
                {TeamData2kyy.slice(0, 3).map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`/teams/2kyy/${item.imageSrc}.jpg`}
                            lazyImageSrc={`/teams/2kyy/lazy/${item.imageSrc}-min.jpg`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>

            <h2 className={Styles.postHead}>Technical Head</h2>
            <div className={`${Styles.cardContainer}`}>
                {TeamData2kyy.slice(4, 7).map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`/teams/2kyy/${item.imageSrc}.jpg`}
                            lazyImageSrc={`/teams/2kyy/lazy/${item.imageSrc}-min.jpg`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>

            <h2 className={Styles.postHead}>Event Manager</h2>
            <div className={`${Styles.cardContainer}`}>
                {TeamData2kyy.slice(6, 9).map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`/teams/2kyy/${item.imageSrc}.jpg`}
                            lazyImageSrc={`/teams/2kyy/lazy/${item.imageSrc}-min.jpg`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>

            <h2 className={Styles.postHead}>Our 2kyz Members</h2>
            <div className={`${Styles.cardContainer}`}>
                {TeamData2kyz.slice(0, 3).map((item, index) => {
                    return (
                        <TeamCard
                            key={`${String(index)}-team`}
                            name={item.name}
                            title={item.title}
                            imageSrc={`/teams/2kyz/${item.imageSrc}.jpg`}
                            lazyImageSrc={`/teams/2kyz/lazy/${item.imageSrc}-min.jpg`}
                            socials={item.socials}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Teams;
