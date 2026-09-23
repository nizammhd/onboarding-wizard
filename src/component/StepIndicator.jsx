function StepIndicator({ currentStep }) {
  const steps = [
    "Personal Info",
    "Preferences",
    "Tech Stack",
    "Review",
  ];

  return (
    <div>
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <span key={step}>
            <span
              style={{
                fontWeight:
                  currentStep === stepNumber
                    ? "bold"
                    : "normal",

                color:
                  currentStep === stepNumber
                    ? "blue"
                    : "black",
              }}
            >
              {stepNumber}. {step}
            </span>

            {stepNumber < 4 && " → "}
          </span>
        );
      })}
    </div>
  );
}

export default StepIndicator;