import loading from "@/app/loading";
import ActivateAccountForm from "@/components/forms/activateAccountForm";
import BottomGlitter from "@/components/StyledText/BottomGlitter";

export const metadata = {
  title: "Avtivate Account",
  description:
    "Zero-one Coding Club of Motihari College of Engineering, Motihari",
};

const ActivateAccountPage = () => {
  const isLoading= loading
  return (
    <section className="container-70 text-lg">
      <div className="mt-16">
        {isLoading ? null : data?.user?.firstName ? (
          <BottomGlitter text={`hi, ${data?.user?.firstName} `} />
        ) : (
          <BottomGlitter text={`Why are you here?`} />
        )}
      </div>
      <ActivateAccountForm />
    </section>
  );
};

export default ActivateAccountPage;
