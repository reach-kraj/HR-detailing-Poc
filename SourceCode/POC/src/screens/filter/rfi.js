
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import './filter.css';
import questionsData from '../data/template';

const RFI = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try {
      const filteredData = questionsData
        .filter(item => item.HR_RFI && item.HR_RFI.trim()) // Only include items with a non-empty HR_RFI
        .map(item => ({
          clNo: item.clNo.trim(),
          q: item.q.trim(),
          date: item.date.trim(),
          status: item.status.toLowerCase().trim(),
          hrRfi: item.HR_RFI.trim(),
        }));

      setQuestions(filteredData);
    } catch (error) {
      console.error('Error processing questions data:', error);
      setQuestions([]);
    }
  }, []);

  const handleQuestionClick = (clNo) => {
    navigate(`/question/${clNo}`);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    setQuestions(prevQuestions => {
      return [...prevQuestions].sort((a, b) => {
        const numA = parseInt(a.clNo.replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(b.clNo.replace(/[^0-9]/g, ''), 10) || 0;
        return newSortOrder === 'asc' ? numA - numB : numB - numA;
      });
    });
  };

  const getFilteredQuestions = () => {
    if (!searchQuery.trim()) return questions;

    const query = searchQuery.toLowerCase().trim();
    return questions.filter(question => 
      question.clNo.toLowerCase().includes(query) ||
      question.hrRfi.toLowerCase().includes(query)
    );
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate('/')}>Log Out</button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="home-content-box">
        <div className="questions-header">
          <h2>Search by HR RFI ({filteredQuestions.length})</h2>
          <div className="header-controls">
            <button className="filter-button" onClick={handleSort}>
              <span>Sort {sortOrder === 'asc' ? '↓' : '↑'}</span>
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
                className="question-card"
                onClick={() => handleQuestionClick(question.clNo)}
              >
                <div className="question-date">{question.date}</div>
                <div className="question-content">
                  <p>{question.q}</p>
                </div>
                <div className="question-meta">
                  <div className="cl-number">{question.clNo}</div>
                  <div className={`status-badge ${question.status}`}>{question.status}</div>
                  <div className="design-reference-badge highlight">{question.hrRfi}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No questions available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RFI;
