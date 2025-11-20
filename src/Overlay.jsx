import React from 'react'

export default function Overlay({ activeSection, onClose }) {
  if (!activeSection) return null; // Don't show anything if nothing is clicked

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* The Glass Card */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <span className="modal-subtitle">{activeSection.subtitle}</span>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {/* Title */}
        <h1 className="modal-title">{activeSection.title}</h1>
        
        {/* Body Text */}
        <p className="modal-text">{activeSection.text}</p>
        
        {/* Tags / Footer */}
        <div className="modal-tags">
          {activeSection.tags.map((tag, index) => (
            <span key={index} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Action Button */}
        <button className="cta-button">
          {activeSection.subtitle === "Contact Us" ? "Send Signal" : "Learn More"}
        </button>

      </div>
    </div>
  )
}