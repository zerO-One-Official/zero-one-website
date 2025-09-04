import BottomGlitter from "@/components/StyledText/BottomGlitter";

export const metadata = {
  title: "About",
  description:
    "Zero-one Coding Club of Motihari College of Engineering, Motihari",
};
const AboutPage = () => {
  return (
    <section className="container-70 pt-28 md:pt-16 sm:pt-12">
      <div className=" mb-6 sm:mt-8 sm:mb-4">
        <BottomGlitter text="About Zero-one" />
        <div className="mt-6">
          <p className="text-lg">
            This club is an initiative to bring together students interested in
            coding and associated skills in a peer-to-peer learning environment.
            We believe that a peer-to-peer learning environment is the best way
            to hone our skills and achieve our goals. Each member of the club
            brings their own unique vision and perspective, and we encourage
            everyone to share their ideas and experiences. Whether you&#39;re a
            seasoned developer or just starting out, we welcome you to join us
            and be a part of our community. The club is open to all students.
            The only prerequisite to join us is enthusiasm for coding and
            development, or at least curiosity towards it.
          </p>
        </div>
      </div>
      <div className="mt-20 mb-6 sm:mt-8 sm:mb-4">
        <BottomGlitter text="Our Activities" />
        <div className="mt-6">
          <p className="text-lg">
            We organize hackathons, and coding contests often. Checkout more at{" "}
            <a
              className="hover:text-accent font-bold"
              href={process.env.NEXTAUTH_URL}
              target="_blank"
              rel="noreferrer"
            >
              ZERO ONE.
            </a>
            <br />
            We organize sessions related to various technology stacks such as
            Development, Open Source etc. <br /> Host competitions related to
            coding and other tech domains throughout the year.
            <br />
            Develop real world projects and solve real world problems.Checkout
            our GitHub account at GitHub <br />
            We manage the official CodeChef Chapter of MCE, Motihari.
            <br /> See more about our coding culture at our official site{" "}
            <a
              className="hover:text-accent font-bold"
              href={process.env.NEXTAUTH_URL}
              target="_blank"
              rel="noreferrer"
            >
              ZERO ONE.
            </a>
          </p>
        </div>
      </div>

      {/* <Events /> */}
    </section>
  );
};

export default AboutPage;
