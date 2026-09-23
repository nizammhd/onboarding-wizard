function Review({
  formData,
  setCurrentStep,
  handleSubmit,
}) {
  return (
    <div className="review">

      <div className="review-title">
        <h2>Review & Submit</h2>

        <p>
          Please check your information before submitting.
        </p>
      </div>

      <div className="review-section">

        <div className="review-header">
          <h3>Personal Information</h3>

          <button
            className="edit-button"
            onClick={() => setCurrentStep(1)}
          >
            Edit
          </button>
        </div>

        <div className="review-content">

          <div className="review-item">
            <span>Name</span>
            <strong>{formData.name}</strong>
          </div>

          <div className="review-item">
            <span>Email</span>
            <strong>{formData.email}</strong>
          </div>

          <div className="review-item">
            <span>Portfolio / GitHub</span>
            <strong>{formData.portfolio}</strong>
          </div>

        </div>
      </div>

      <div className="review-section">

        <div className="review-header">
          <h3>Preferences</h3>

          <button
            className="edit-button"
            onClick={() => setCurrentStep(2)}
          >
            Edit
          </button>
        </div>

        <div className="review-content">

          <div className="review-item">
            <span>Primary Track</span>
            <strong>{formData.track}</strong>
          </div>

          <div className="review-item">
            <span>Experience Level</span>
            <strong>{formData.experience}</strong>
          </div>

        </div>
      </div>

      <div className="review-section">

        <div className="review-header">
          <h3>Tech Stack</h3>

          <button
            className="edit-button"
            onClick={() => setCurrentStep(3)}
          >
            Edit
          </button>
        </div>

        <div className="tech-list">

          {formData.techStack.map((tech) => (
            <span
              className="tech-tag"
              key={tech}
            >
              {tech}
            </span>
          ))}

        </div>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit Application
      </button>

    </div>
  );
}

export default Review;