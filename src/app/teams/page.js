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

                <h2 className={Styles.postHead}>2023</h2>

                <div className={Styles.cardContainer}>

                    {data && data?.teams?.map((item, index) => {
                        console.log(item);
                        return (
                            <TeamCard
                                key={`${String(index)}-team`}
                                name={`${item.firstName} ${item.lastName}`}
                                position={item.position}
                                imageSrc={`${item.profilePic}`}
                                lazyImageSrc={`${item.profilePic}`}
                                gitHub={item.gitHub}
                                linkedIn={item.linkedIn}
                                email={item.email}
                                otherLinks={item.otherLinks}
                            />
                        );
                    })}
                </div>

            </section>
    );
}

export default Teams;
