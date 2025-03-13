

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import "./filter.css";
import { useJobQuestions } from "../data/hooks/useJobQuestions"; // Import the custom hook

const Sketch = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { questions, loading, error } = useJobQuestions(); // Use the hook

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  // Sorting function by clNo
  const getSortedQuestions = (questionsToSort) => {
    try {
      const sorted = [...questionsToSort].sort((a, b) => {
        const numA = parseInt(a.clNo.replace(/[^0-9]/g, ""), 10) || 0;
        const numB = parseInt(b.clNo.replace(/[^0-9]/g, ""), 10) || 0;
        return sortOrder === "asc" ? numA - numB : numB - numA;
      });
      return sorted;
    } catch (error) {
      console.error("Error sorting questions:", error);
      return questionsToSort;
    }
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Filter questions by HR_SK and search query
  const getFilteredQuestions = () => {
    try {
      // Filter out questions missing required fields
      const validQuestions = questions.filter(
        (item) => item.clNo && item.q && item.date && item.status && item.HR_SK
      );

      if (!searchQuery.trim()) return getSortedQuestions(validQuestions);

      const query = searchQuery.toLowerCase().trim();
      const filtered = validQuestions.filter(
        (question) =>
          question.clNo.toLowerCase().includes(query) ||
          question.HR_SK.toLowerCase().includes(query)
      );
      return getSortedQuestions(filtered);
    } catch (error) {
      console.error("Error filtering questions:", error);
      return questions;
    }
  };

  const filteredQuestions = getFilteredQuestions();

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <div className="home-content-box">
        <div className="questions-header">
          <h2>Filter based on Sketch ({filteredQuestions.length})</h2>
          <div className="header-controls">
            <button className="filter-button" onClick={handleSort}>
              <span>Sort {sortOrder === "asc" ? "Asc" : "Desc"}</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <div
                key={`${question.clNo}-${index}`}
                className="question-cards"
                onClick={() => handleQuestionClick(question.clNo)}
              >
                <div className="question-date">{question.date}</div>
                <div className="question-content">
                  <p>{question.q}</p>
                </div>
                <div className="question-meta">
                  <div className="cl-number">{question.clNo}</div>
                  <div className={`status-badge ${question.status}`}>
                    {question.status}
                  </div>
                  <div className="sketch-badge highlight">{question.HR_SK}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "No questions available"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sketch;