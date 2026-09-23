import { useEffect, useRef, useState } from "react";
import "./App.css";

import PersonalInfo from "./component/PersonalInfo.jsx";
import Preferences from "./component/Preferences.jsx";
import TechStack from "./component/TechStack.jsx";
import Review from "./component/Review.jsx";
import StepIndicator from "./component/StepIndicator.jsx";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    track: "",
    experience: "",
    techStack: [],
  });

  const [errors, setErrors] = useState({});
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const skipNextSave = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("onboardingForm");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    setIsDraftSaved(false);

    const timer = setTimeout(() => {
      localStorage.setItem(
        "onboardingForm",
        JSON.stringify(formData)
      );

      setIsDraftSaved(true);

      const hideTimer = setTimeout(() => {
        setIsDraftSaved(false);
      }, 2000);

      return () => clearTimeout(hideTimer);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  function validateField(field, value) {
    let message = "";

    if (!value.trim()) {
      message = "This field is required";
    } else if (
      field === "email" &&
      !value.includes("@")
    ) {
      message = "Please enter a valid email";
    } else if (field === "portfolio") {
      try {
        new URL(value);
      } catch {
        message = "Please enter a valid URL";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }

  function validateStep() {
    const e = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        e.name = "Name is required";
      }

      if (!formData.email.trim()) {
        e.email = "Email is required";
      } else if (!formData.email.includes("@")) {
        e.email = "Please enter a valid email";
      }

      if (!formData.portfolio.trim()) {
        e.portfolio =
          "Portfolio / GitHub URL is required";
      } else if (!isValidUrl(formData.portfolio)) {
        e.portfolio = "Please enter a valid URL";
      }
    }

    if (currentStep === 2) {
      if (!formData.track) {
        e.track = "Please select a track";
      }

      if (!formData.experience) {
        e.experience =
          "Please select your experience level";
      }
    }

    if (
      currentStep === 3 &&
      formData.techStack.length === 0
    ) {
      e.techStack =
        "Please select at least one technology";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  }

  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  function isStepValid() {
    if (currentStep === 1) {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.email.includes("@") &&
        formData.portfolio.trim() !== "" &&
        isValidUrl(formData.portfolio)
      );
    }

    if (currentStep === 2) {
      return (
        formData.track !== "" &&
        formData.experience !== ""
      );
    }

    if (currentStep === 3) {
      return formData.techStack.length > 0;
    }

    return true;
  }

  function handleNext() {
    if (validateStep()) {
      setCurrentStep((step) => step + 1);
      setErrors({});
    }
  }

  function handleBack() {
    setCurrentStep((step) => step - 1);
    setErrors({});
  }

  function handleSubmit() {
    skipNextSave.current = true;

    localStorage.removeItem("onboardingForm");

    setFormData({
      name: "",
      email: "",
      portfolio: "",
      track: "",
      experience: "",
      techStack: [],
    });

    setErrors({});
    setIsDraftSaved(false);
    setCurrentStep(1);

    alert("Onboarding submitted successfully!");
  }

  return (
    <div className="app-container">

      <div className="header">
        <h1>Onboarding Wizard</h1>

        <p>
          Tell us a little about yourself to get started.
        </p>
      </div>

      <StepIndicator
        currentStep={currentStep}
      />

      {isDraftSaved && (
        <div className="draft-message">
          ✓ Draft saved
        </div>
      )}

      <div className="wizard-card">

        {currentStep === 1 && (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            validateField={validateField}
          />
        )}

        {currentStep === 2 && (
          <Preferences
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            validateField={validateField}
          />
        )}

        {currentStep === 3 && (
          <TechStack
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <Review
            formData={formData}
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
          />
        )}

        {currentStep !== 4 && (
          <div className="navigation">

            <button
              className="back-button"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              ← Back
            </button>

            <button
              className="next-button"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {currentStep === 3
                ? "Review →"
                : "Next →"}
            </button>

          </div>
        )}

      </div>

      <p className="footer">
        Your information is saved automatically.
      </p>

    </div>
  );
}

export default App;