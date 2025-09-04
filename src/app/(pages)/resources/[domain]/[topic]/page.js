import React from "react";
import Subtopic from "@/components/resource/subtopics";
import { getSubTopics } from "@/action/resource";

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
