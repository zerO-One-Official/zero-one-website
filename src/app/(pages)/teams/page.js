"use client"
import BottomGlitter from '@/components/StyledText/BottomGlitter';
import Spinner from '@/components/loader/Spinner';
import Styles from '@/components/teams/Team.module.css';
import TeamCard from '@/components/teams/TeamsCard';
import toast from 'react-hot-toast';
import useSWR from 'swr';

function Teams() {


    const fetcher = url => fetch(url).then(r => r.json());

    const { data, error, isLoading } = useSWR(`/api/teams`, fetcher);

    if (error) toast.error(error.message);

    const groupedData = data?.teams.reduce((result, current) => {
        if (!result[current.group]) {
            result[current.group] = [];
        }
        result[current.group].push(current);
        return result;
    }, {});



    return (

        isLoading ?

            <Spinner />

            :

            <section className="mt-16 mb-12 container-70">
                <div className="my-16 w-full text-center">
                    <BottomGlitter text="Our Team" />
                    <h3 className="text-lg mt-8">
                        The strength of the team is each individual member. The strength of
                        each member is the team.
                        <br />- Phil Jackson
                    </h3>
                </div>


                <div className={`flex flex-col gap-14`}>
                    {groupedData && Object.keys(groupedData).map(group => (
                        <div key={group}>
                            <h2 className={Styles.postHead}>{group}</h2>
                            <div className={Styles.cardContainer}>
                                {
                                    groupedData[group].map(team => (
                                        <TeamCard
                                            key={team._id}
                                            name={`${team.user.firstName} ${team.user.lastName}`}
                                            position={team.position}
                                            imageSrc={`${team.user.profilePic}`}
                                            lazyImageSrc={`${team.user.profilePic}`}
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
