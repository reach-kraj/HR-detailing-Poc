import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questionsData from './data/template';
import './questionview.css';

const QuestionView = () => {
  const { clNo } = useParams();
  const navigate = useNavigate();
  
  // Find the question data based on clNo
  const questionData = questionsData.find(q => q.clNo === clNo);

  if (!questionData) {
    return (
      <div className="home-container">
        <div className="home-header">
          <div className="company-logo">
            <h1>H&R Detailing</h1>
          </div>
          <button className="logout-button" onClick={() => navigate('/')}>
            Log Out
          </button>
        </div>
        <div className="back-button-div">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <div className="home-content-box">
          <p>Question not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="company-logo">
          <h1>H&R Detailing</h1>
        </div>
        <button className="logout-button" onClick={() => navigate('/')}>
          Log Out
        </button>
      </div>

      <div className="back-button-div">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="home-content-box">
        <div className="question-detail-card">
          <div className="question-header">
            <div className="header-left">
              <div className="detail-row">
                <span className="detail-label">CL No:</span>
                <span className="detail-value">{questionData.clNo}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">H&R RFI No:</span>
                <span className="detail-value">{questionData.HR_RFI}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">HRD Detailer Initials:</span>
                <span className="detail-value">{questionData.HRD_Detailer_Initials}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Design Reference:</span>
                <span className="detail-value">{questionData.Design_reference}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sequence:</span>
                <span className="detail-value">{questionData.Seq_area_zone?.split('/')[0]}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Zone:</span>
                <span className="detail-value">{questionData.Seq_area_zone?.split('/')[1]}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Area:</span>
                <span className="detail-value">{questionData.Seq_area_zone?.split('/')[2]}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stage:</span>
                <span className="detail-value">{questionData.Stage}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sketch:</span>
                <span className="detail-value">{questionData.HR_SK}</span>
              </div>
            </div>
            <div className="header-right">
              <div className="detail-row">
                <span className="detail-label">Sent Date:</span>
                <span className="detail-value">{questionData.DateSent}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${questionData.status}`}>{questionData.status}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Response Date:</span>
                <span className="detail-value">{questionData.Response_Date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Respond By:</span>
                <span className="detail-value">{questionData.Resp_by}</span>
              </div>
            </div>
          </div>

          <div className="question-content-section">
            <h3>Question</h3>
            <div className="question-text">
              <p>{questionData.q}</p>
              <span className="sent-datetime">Sent date and time: {questionData.date}</span>
            </div>
          </div>

          <div className="response-section">
            <h3>Response</h3>
            <div className="response-text">
              <p>{questionData.Response}</p>
            </div>
          </div>

          <div className="additional-notes">
            <span className="detail-label">Additional Notes:</span>
            <span className="detail-value">{questionData.Additional_Notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;