"use client";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { CiLinkedin, CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa6";
import Tilt from "react-parallax-tilt";

const ICON_SIZE = 28;

function TeamCard({
  name,
  position,
  gitHub,
  linkedIn,
  email,
  imageSrc,
  lazyImageSrc,
  otherLinks,
}) {
  return (
    <Tilt
      glareEnable={true}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      glareColor={"rgb(0,0,0)"}
    >
      <div
        className={`h-full relative flex flex-col justify-center items-center overflow-hidden bg-primary-light text-primary group`}
      >
        <div className="flex justify-center">
          <Image
            src={"/fullLogo.png"}
            width={344}
            height={200}
            className="invert w-3/5 h-auto"
            alt="logo"
          />
        </div>
        <div className="relative xs:h-60 lg:h-40 h-60 z-10 w-full overflow-hidden text-center bg-cyan-100 flex items-center justify-center">
          {imageSrc ? (
            <Image
              height={240}
              width={240}
              src={imageSrc}
              alt={name}
              quality={100}
              placeholder="blur"
              blurDataURL={lazyImageSrc}
              className="z-10 h-full w-full object-cover "
            />
          ) : (
            <BiUserCircle
              size={25}
              className="z-10 w-full h-auto scale-[1.2] fill-primary"
            />
          )}
          <div className="flex-1 flex overflow-hidden flex-col justify-between absolute top-full group-hover:-translate-y-full transition-[transform] bg-black/70 z-10 w-full ">
            <div className="z-10 flex items-center justify-center flex-col text-center p-6 flex-1 capitalize">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <h3 className="text-white/60 text-lg font-medium">{position}</h3>
            </div>
            <div
              className={`flex justify-around items-center w-full z-10 pb-6`}
            >
              {gitHub || email || linkedIn ? (
                <>
                  {gitHub && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={gitHub}
                      className="p-[.5px] hover:fill-accent fill-white"
                      title="GitHub"
                    >
                      <FaGithub
                        size={ICON_SIZE}
                        width={ICON_SIZE}
                        className="fill-inherit transition-[fill]"
                      />
                    </a>
                  )}

                  {linkedIn && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={linkedIn}
                      title="LinkedIn"
                      className="hover:fill-accent fill-white"
                    >
                      <CiLinkedin
                        size={ICON_SIZE + 5}
                        className="fill-inherit transition-[fill]"
                      />
                    </a>
                  )}
                  {email && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`mailto:${email}`}
                      title="Mail"
                      className="hover:fill-accent fill-white"
                    >
                      <CiMail size={ICON_SIZE + 3} className="fill-inherit" />
                    </a>
                  )}
                </>
              ) : (
                <span>Socially Invisible</span>
              )}
            </div>
          </div>
        </div>

        <span className="bg-accent mt-auto z-10 h-1 w-full block"></span>
      </div>
    </Tilt>
  );
}

export default TeamCard;
