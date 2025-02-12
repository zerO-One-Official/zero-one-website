import { getTopics } from "@/action/resources";

const page = async ({ params }) => {
  const { domain } = await params;

  const topics = await getTopics(domain);
  console.log(topics);

  return <div>{domain}</div>;
};

export default page;
