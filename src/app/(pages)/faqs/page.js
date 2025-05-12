import { getFaqs } from "@/action/faq";
import Faq from "@/components/faqs/Faq";

async function FAQs() {
  const { faqs } = await getFaqs();

  return (
    <section className="container-70 pt-16 sm:pt-8 sm:w-4/5 xs:w-[85%]">
      <div className="mt-6 mb-20 sm:mt-8 sm:mb-20 xs:mt-4 xs:mb-16">
        <h1 className="text-6xl xl:text-5xl xl:leading-snug sm:text-4xl text-center">
          Frequently Asked Question (FAQs) 🤔
        </h1>
      </div>
      <div className="grid gap-4 sm:gap-2">
        {faqs?.map(({ _id, question, answer }, index) => {
          return (
            <Faq
              key={index}
              _id={_id.toString()}
              question={question}
              answer={answer}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FAQs;
