"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContestTabs = ({ details, questions, winners }) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-3 gap-2 rounded-3xl border border-white/5 bg-white/5 p-2">
        <TabsTrigger
          value="details"
          className="rounded-2xl py-3 text-base data-[state=active]:bg-accent data-[state=active]:text-primary"
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="questions"
          className="rounded-2xl py-3 text-base data-[state=active]:bg-accent data-[state=active]:text-primary"
        >
          Questions
        </TabsTrigger>
        <TabsTrigger
          value="winners"
          className="rounded-2xl py-3 text-base data-[state=active]:bg-accent data-[state=active]:text-primary"
        >
          Winners
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-6">
        {details}
      </TabsContent>
      <TabsContent value="questions" className="mt-6">
        {questions}
      </TabsContent>
      <TabsContent value="winners" className="mt-6">
        {winners}
      </TabsContent>
    </Tabs>
  );
};

export default ContestTabs;
