"use client";
import Image from "next/image";
import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";
import { CiLinkedin, CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa6";
import { Link2 } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Logo from "../logo/Logo";

const ICON_SIZE = 24;

function TeamCard({
  name,
  username,
  position,
  gitHub,
  linkedIn,
  email,
  imageSrc,
  otherLinks,
}) {
  return (
    <Tilt
      glareEnable={true}
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1000}
      glareColor={"rgb(0,0,0)"}
      className="mx-auto w-full max-w-[350px] border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 shadow-cus rounded-3xl overflow-hidden"
    >
      <div
        className="group relative flex h-full w-full flex-col items-center justify-center gap-6 p-6 text-white"
      >
        <div className="flex gap-4 p-2 w-full">
          <Logo />
        </div>
        <div className="relative z-10 aspect-[4/5] w-full overflow-hidden bg-cyan-100 text-center flex items-center justify-center">
          {imageSrc ? (
            <Image
              height={438}
              width={350}
              src={imageSrc}
              alt={name}
              quality={75}
              sizes="(max-width: 640px) 90vw, (max-width: 1535px) 40vw, 350px"
              loading="lazy"
              className="z-10 h-full w-full object-cover object-[center_35%]"
            />
          ) : (
            <BiUserCircle
              size={25}
              className="z-10 w-full h-auto scale-[1.2] fill-primary"
            />
          )}
          {username && (
            <Link
              href={`/user/${encodeURIComponent(username)}`}
              aria-label={`View ${name}'s profile`}
              className="absolute inset-0 z-20"
            />
          )}
          <div className="pointer-events-none absolute top-full z-30 flex w-full flex-1 flex-col justify-between overflow-hidden rounded-t-3xl bg-black/70 transition-[transform] group-hover:-translate-y-full">
            <div className="z-10 flex items-center justify-center flex-col text-center p-2 flex-1 capitalize">
              <h2 className="text-2xl font-semibold text-white">{name}</h2>
              <h3 className="text-white text-lg font-medium">{position}</h3>
            </div>
            <div className="pointer-events-auto relative z-10 flex w-full items-center justify-around pb-2">
              {gitHub || email || linkedIn || otherLinks?.length ? (
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
                  {otherLinks?.map(({ platform, link }) => (
                    <a
                      key={platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={link}
                      title={platform}
                      aria-label={platform}
                      className="text-white transition-colors hover:text-accent"
                    >
                      <Link2 size={ICON_SIZE} />
                    </a>
                  ))}
                </>
              ) : (
                <span>Socially Invisible</span>
              )}
            </div>
          </div>
        </div>

        {/* <span className="bg-accent mt-auto z-10 h-1 w-full block"></span> */}
      </div>
    </Tilt>
  );
}

export default TeamCard;
