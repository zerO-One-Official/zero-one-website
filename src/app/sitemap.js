const urls = [
  {
    url: "https://zeroonemce.com",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: "https://zeroonemce.com/about",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://zeroonemce.com/contact",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
];
export default async function sitemap() {
  // const questions = await getQuestions();
  // const questionUrls = questions.map((question) => ({
  //   url: `https://zeroonemce.com/playground/${question.slug}`,
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
