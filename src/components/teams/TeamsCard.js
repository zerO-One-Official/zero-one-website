import Image from 'next/image';
import { CiLinkedin, CiMail } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa6';
import { PiGithubLogoLight } from 'react-icons/pi';

const ICON_SIZE = 28;

function TeamCard({ name, title, company, socials, imageSrc, lazyImageSrc }) {
    return (
        <div className={`relative flex flex-col justify-center items-center overflow-hidden bg-primary-light text-primary`}>
            <div className="flex justify-center pb-10">
                <Image src={'/fullLogo.png'} width={344} height={200} className='invert w-3/5 h-auto' alt='logo' />
            </div>
            <div className="h-60 z-10 w-60 text-center mb-18 overflow-hidden rounded-full bg-cyan-100 group">
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
            </div>
            <div className="z-10 text-center my-5 p-6">
                <h2 className="text-2xl  text-primary font-medium ">{name}</h2>
                <h3 className='text-primary/80 text-lg font-medium'>{title}</h3>
            </div>
            <div className={`flex justify-around items-center w-full z-10 pb-10`}>
                {socials.gitHub || socials.email || socials.linkedIn ? (
                    <>
                        {socials.gitHub && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://github.com/${socials.gitHub}/`}
                                className='p-[.5px] group '
                                title='GitHub'
                            >
                                <FaGithub size={ICON_SIZE} width={ICON_SIZE} className='fill-primary group-hover:fill-accent' />
                            </a>
                        )}

                        {socials.linkedIn && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.linkedIn.com/in/${socials.linkedIn}/`}
                                className='group'
                                title='LinkedIn'
                            >
                                <CiLinkedin size={ICON_SIZE + 5} className='fill-primary group-hover:fill-accent ' />
                            </a>
                        )}
                        {socials.email && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`mailto:${socials.email}`}
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
