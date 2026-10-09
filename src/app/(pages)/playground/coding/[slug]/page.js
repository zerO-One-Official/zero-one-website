import { getCodingQuestion } from "@/action/codingQuestion";
import { Playground } from "@/components/codeEditor";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CodingPlaygroundPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { contest: contestSlug } = (await searchParams) || {};
  if (contestSlug) redirect(`/contest/${contestSlug}/attempt`);
  const { question } = await getCodingQuestion(slug);

  if (!question) notFound();
  return <Playground problem={question} />;
};

export default CodingPlaygroundPage;
