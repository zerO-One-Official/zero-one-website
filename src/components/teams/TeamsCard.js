import Image from 'next/image';
import { BiUserCircle } from 'react-icons/bi';
import { CiLinkedin, CiMail } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa6';

const ICON_SIZE = 28;

function TeamCard({ name, position, gitHub, linkedIn, email, imageSrc, lazyImageSrc, otherLinks }) {
    return (
        <div className={`relative flex flex-col justify-center items-center overflow-hidden bg-primary-light text-primary`}>
            <div className="flex justify-center pb-10">
                <Image src={'/fullLogo.png'} width={344} height={200} className='invert w-3/5 h-auto' alt='logo' />
            </div>
            <div className="h-60 z-10 w-60 text-center mb-18 overflow-hidden rounded-full bg-cyan-100 group flex items-center justify-center">
                {
                    imageSrc ?
                        <Image
                            height={100}
                            width={100}
                            layout="responsive"
                            src={imageSrc}
                            alt={name}
                            quality={100}
                            placeholder="blur"
                            blurDataURL={lazyImageSrc}
                            className="z-10 h-auto max-w-full object-cover object-top scale-100 group-hover:scale-125 transition-all duration-500"
                        />
                        :
                        <BiUserCircle size={25} className="z-10 w-full h-auto scale-[1.2] fill-primary" />
                }
            </div>
            <div className="z-10 flex items-center justify-center flex-col text-center my-5 p-6 flex-1 capitalize">
                <h2 className="text-2xl  text-primary font-medium">{name}</h2>
                <h3 className='text-primary/80 text-lg font-medium'>{position}</h3>
            </div>
            <div className={`flex justify-around items-center w-full z-10 pb-10`}>
                {gitHub || email || linkedIn ? (
                    <>
                        {gitHub && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://github.com/${gitHub}`}
                                className='p-[.5px] group '
                                title='GitHub'
                            >
                                <FaGithub size={ICON_SIZE} width={ICON_SIZE} className='fill-primary group-hover:fill-accent' />
                            </a>
                        )}

                        {linkedIn && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.linkedIn.com/in/${linkedIn}`}
                                className='group'
                                title='LinkedIn'
                            >
                                <CiLinkedin size={ICON_SIZE + 5} className='fill-primary group-hover:fill-accent ' />
                            </a>
                        )}
                        {email && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`mailto:${email}`}
                                className='group'
                                title='Mail'
                            >
                                <CiMail size={ICON_SIZE + 3} className='fill-primary group-hover:fill-accent ' />
                            </a>
                        )}
                    </>
                ) : (
                    <span >
                        Socially Invisible
                    </span>
                )}
            </div>

            <span className='bg-accent h-1 w-full block'></span>

        </div>
    );
}

export default TeamCard;
