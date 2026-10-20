import React from "react";
import Subtopic from "@/components/resource/subtopics";
import { getSubTopics } from "@/action/resource";

export async function generateMetadata({ params }) {
  const { domain: domainSlug, topic: topicSlug } = await params;
  const topic = await getSubTopics(domainSlug, topicSlug);
  const title = topic?.title || topicSlug.replace(/-/g, " ");

  return {
    title,
    description:
      topic?.description ||
      `Explore ${title} learning materials and subtopics in ZERO ONE resources.`,
  };
}

const SubtopicPage = async ({ params }) => {
  const { domain: domainSlug, topic: topicSlug } = await params;
  const data = await getSubTopics(domainSlug, topicSlug);

  return (
    <div>
      <Subtopic data={data} domain={domainSlug} topic={topicSlug} />
    </div>
  );
};

export default SubtopicPage;
