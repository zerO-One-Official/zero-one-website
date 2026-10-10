import { getFaqs } from "@/action/faq";
import Faq from "@/components/faqs/Faq";

async function FAQs() {
  const { faqs } = await getFaqs();

  return (
    <section className="container-70 w-[85%] pt-8 sm:w-4/5 xl:pt-16">
      <div className="mt-4 mb-16 sm:mt-6 sm:mb-20">
        <h1 className="text-4xl sm:text-5xl xl:text-6xl text-center">
          Frequently Asked Question (FAQs) 🤔
        </h1>
      </div>
      <div className="grid gap-2 sm:gap-4">
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
