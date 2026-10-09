const websiteUrl = process.env.NEXTAUTH_URL || "https://zeroonemce.com";

const urls = [
  {
    url: websiteUrl,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${websiteUrl}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${websiteUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
];
export default async function sitemap() {
  // const questions = await getQuestions();
  // const questionUrls = questions.map((question) => ({
  //   url: `${websiteUrl}/playground/${question.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));

  // const resources = await getResource;

  return [
    ...urls,
    // ...questionUrls,
    // ...resources,
  ];
}
