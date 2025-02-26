// data/jobTemplateMapper.js
const jobTemplateMap = {
  J001: () => import("./template job1.js"),
  J002: () => import("./template job2.js"),
  J003: () => import("./template job3.js"),
  J004: () => import("./template job4.js"),
};

// Default fallback to template.js if no job matches
const defaultTemplate = () => import("./template.js");

export const getQuestionsDataForJob = async (jobNo) => {
  const importFn = jobTemplateMap[jobNo] || defaultTemplate;
  try {
    const module = await importFn();
    return module.default; // Assuming each template exports `questionsData` as default
  } catch (error) {
    console.error(`Error loading template for job ${jobNo}:`, error);
    const fallbackModule = await defaultTemplate();
    return fallbackModule.default; // Fallback to template.js on error
  }
};
