import React from "react";
import Subtopic from "@/components/resource/subtopics";
import { getSubTopics } from "@/action/resource";

const SubtopicPage = async ({ params }) => {
  // ❌ No need to use `await` on `params`
  const { domain: domainSlug, topic: topicSlug } = await params;
  console.log(domainSlug, topicSlug);
  const data = await getSubTopics(domainSlug, topicSlug);
  console.log(data, "sp");

  return (
    <div>
      <Subtopic
        data={JSON.parse(JSON.stringify(data))}
        domain={domainSlug}
        topic={topicSlug}
      />
    </div>
  );
};

export default SubtopicPage;
