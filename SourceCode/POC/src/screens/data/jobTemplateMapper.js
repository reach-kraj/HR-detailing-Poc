

const jobTemplateMap = {
  "01": () => import("./template job1.js"),
  "02": () => import("./template job2.js"),
  "03": () => import("./template job3.js"),
  "04": () => import("./template job4.js"),
};

const defaultTemplate = () => import("./template.js");

export const getQuestionsDataForJob = async (jobNo) => {
  const jobKey = jobNo.slice(-2); // Extract last two digits (e.g., "01" from "C25001")
  const importFn = jobTemplateMap[jobKey] || defaultTemplate;
  try {
    const module = await importFn();
    return module.default; // Assuming each template exports `questionsData` as default
  } catch (error) {
    console.error(`Error loading template for job ${jobNo}:`, error);
    const fallbackModule = await defaultTemplate();
    return fallbackModule.default; // Fallback to template.js on error
  }
};