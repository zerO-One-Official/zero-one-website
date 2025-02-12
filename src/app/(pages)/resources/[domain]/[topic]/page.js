import { getSubTopics } from "@/action/resources";

const page = async ({ params }) => {
  const { domain, topic } = await params;

  const subTopics = await getSubTopics(domain, topic);

  return (
    <div>
      {domain}/{topic}
    </div>
  );
};

export default page;
