import Image from 'next/image';
import { CiLinkedin, CiMail } from 'react-icons/ci';
import { PiGithubLogoLight } from 'react-icons/pi';
import Style from './Team.module.css';

const ICON_SIZE = 28;

function TeamCard({ name, title, company, socials, imageSrc, lazyImageSrc }) {
  return (
    <div className={Style.card}>
      <div className="z-10 w-full text-center h-2/3 mb-18 mt-4 overflow-hidden rounded-lg">
        <Image
          className="z-10 rounded-lg object-cover object-top"
          height={100}
          width={100}
          layout="responsive"
          src={imageSrc}
          alt={name}
          quality={100}
          placeholder="blur"
          blurDataURL={lazyImageSrc}
        />
      </div>
      <div className="z-10 text-center my-5">
        <h3 className="text-xl">{name}</h3>
        <h4>{title}</h4>
        <h2>{company}</h2>
      </div>
      <div className={Style.socials}>
        {socials.gitHub || socials.email || socials.linkedIn ? (
          <>
            {socials.gitHub && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${socials.gitHub}/`}
                className='border-[1.6px] border-white rounded-full p-[.5px] hover:border-accent'
              >
                <PiGithubLogoLight size={ICON_SIZE} width={ICON_SIZE} />
              </a>
            )}

            {socials.linkedIn && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.linkedIn.com/in/${socials.linkedIn}/`}
              >
                <CiLinkedin size={ICON_SIZE + 5} />
              </a>
            )}
            {socials.email && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${socials.email}`}
              >
                <CiMail size={ICON_SIZE + 3} />
              </a>
            )}
          </>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>
            Socially Invisible
          </span>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
