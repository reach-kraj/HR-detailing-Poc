
// filter/Clno.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import "./filter.css";
import { useJobQuestions } from "../data/hooks/useJobQuestions";

const Clno = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { questions, loading, error } = useJobQuestions();

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  // Sorting function that returns a sorted array
  const getSortedQuestions = (questionsToSort) => {
    try {
      const sorted = [...questionsToSort].sort((a, b) => {
        const numA = parseInt(a.clNo.replace(/[^0-9]/g, "")) || 0;
        const numB = parseInt(b.clNo.replace(/[^0-9]/g, "")) || 0;
        return sortOrder === "asc" ? numA - numB : numB - numA; // Corrected logic for asc/desc
      });
      return sorted;
    } catch (error) {
      console.error("Error sorting questions:", error);
      return questionsToSort; // Return original array on error
    }
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const getFilteredQuestions = (questionsToFilter) => {
    try {
      if (!searchQuery.trim()) return questionsToFilter;
      const query = searchQuery.toLowerCase().trim();
      return questionsToFilter.filter((question) =>
        question.clNo.toLowerCase().includes(query)
      );
    } catch (error) {
      console.error("Error filtering questions:", error);
      return questionsToFilter;
    }
  };

  // Apply sorting and filtering
  const sortedQuestions = getSortedQuestions(questions);
  const filteredQuestions = getFilteredQuestions(sortedQuestions);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <div className="home-content-box">
        <div className="questions-header">
          <h2>Search by CL no ({filteredQuestions.length})</h2>
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
                  <div className="stage-badge highlight">{question.clNo}</div>
                  <div className={`status-badge ${question.status}`}>
                    {question.status}
                  </div>
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

export default Clno;