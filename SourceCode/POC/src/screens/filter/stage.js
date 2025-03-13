import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import "./filter.css";
import { useJobQuestions } from "../data/hooks/useJobQuestions";

const Stage = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const { questions, loading, error } = useJobQuestions();

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

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

  const getFilteredQuestions = () => {
    try {
      const validQuestions = questions.filter(
        (item) => item.clNo && item.q && item.date && item.status && item.Stage
      );
      if (!searchQuery.trim()) return getSortedQuestions(validQuestions);

      const query = searchQuery.toLowerCase().trim();
      const filtered = validQuestions.filter(
        (question) =>
          question.clNo.toLowerCase().includes(query) ||
          question.Stage.toLowerCase().includes(query)
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
          <h2>Search by Stage ({filteredQuestions.length})</h2>
          <div className="header-controls">
            <button className="filter-button" onClick={handleSort}>
              <span>Sort {sortOrder === "asc" ? "Asc" : "Desc"}</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by CL No or Stage..."
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
                  <div className="stage-badge highlight">{question.Stage}</div>
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

export default Stage;