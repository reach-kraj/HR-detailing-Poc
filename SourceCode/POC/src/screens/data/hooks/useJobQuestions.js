
// data/hooks/useJobQuestions.js
import { useState, useEffect } from "react";
import { getQuestionsDataForJob } from "../jobTemplateMapper";

export const useJobQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      const selectedJob = JSON.parse(sessionStorage.getItem("selectedJob"));
      const jobNo =
        selectedJob?.jobNo || (user?.jobs && user.jobs[0]) || "J001";

      try {
        setLoading(true);
        const data = await getQuestionsDataForJob(jobNo);
        console.log("Fetched data for job", jobNo, ":", data); // Debug log
        const validatedData = data
          .map((item, index) => {
            // Validate only the core required fields
            if (!item.clNo || !item.q || !item.date || !item.status) {
              console.error(
                `Missing required fields in question at index ${index}:`,
                item
              );
              return null;
            }
            // Return the full item with trimmed required fields
            return {
              ...item, // Preserve all original fields (e.g., HR_SK, Stage, Work_Done_By, etc.)
              clNo: item.clNo.trim(),
              q: item.q.trim(),
              date: item.date.trim(),
              status: item.status.toLowerCase().trim(),
            };
          })
          .filter((item) => item !== null);
        setQuestions(validatedData);
      } catch (err) {
        setError("Failed to load questions data");
        console.error(err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};