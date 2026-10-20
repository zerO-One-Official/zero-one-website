"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PracticeTabs = ({ codingContent, quizContent }) => (
  <Tabs defaultValue="coding" className="w-full">
    <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-3xl border border-white/5 bg-white/5 p-2">
      <TabsTrigger
        value="coding"
        className="rounded-2xl py-3 text-base data-[state=active]:bg-accent data-[state=active]:text-primary"
      >
        Coding Questions
      </TabsTrigger>
      <TabsTrigger
        value="quiz"
        className="rounded-2xl py-3 text-base data-[state=active]:bg-accent data-[state=active]:text-primary"
      >
        Quiz
      </TabsTrigger>
    </TabsList>
    <TabsContent value="coding" className="mt-6">
      {codingContent}
    </TabsContent>
    <TabsContent value="quiz" className="mt-6">
      {quizContent}
    </TabsContent>
  </Tabs>
);

export default PracticeTabs;
