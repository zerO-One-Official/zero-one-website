import { Playground } from "@/components/codeEditor";

export const metadata = {
  title: "Code Playground",
  description: "Write, run, and experiment with code in the ZERO ONE online playground.",
};

const PlaygroundPage = async () => {
  return <Playground autoComplete={false} />;
};

export default PlaygroundPage;
