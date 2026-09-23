function TechStack({
  formData,
  setFormData,
  errors,
}) {
  const techOptions = {
    Frontend: [
      "React",
      "Vue",
      "TypeScript",
      "CSS Modules",
    ],

    Backend: [
      "Node.js",
      "Python/Django",
      "PostgreSQL",
      "Redis",
    ],

    "UI/UX Design": [
      "Figma",
      "Storybook",
      "Design Systems",
    ],
  };

  const options =
    techOptions[formData.track] || [];

  function handleTechChange(tech) {
    const isSelected =
      formData.techStack.includes(tech);

    if (isSelected) {
      setFormData({
        ...formData,
        techStack:
          formData.techStack.filter(
            (item) => item !== tech
          ),
      });
    } else {
      setFormData({
        ...formData,
        techStack: [
          ...formData.techStack,
          tech,
        ],
      });
    }
  }

  return (
    <div>
      <h2>Tech Stack</h2>

      <p>
        Selected Track: {formData.track}
      </p>

      {options.map((tech) => (
        <div key={tech}>
          <label>
            <input
              type="checkbox"
              checked={formData.techStack.includes(
                tech
              )}
              onChange={() =>
                handleTechChange(tech)
              }
            />

            {" "}

            {tech}
          </label>
        </div>
      ))}

      {errors.techStack && (
        <p style={{ color: "red" }}>
          {errors.techStack}
        </p>
      )}

      <br />

      <p>Selected Technologies:</p>

      {formData.techStack.length > 0 ? (
        <ul>
          {formData.techStack.map(
            (tech) => (
              <li key={tech}>
                {tech}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>
          No technologies selected
        </p>
      )}
    </div>
  );
}

export default TechStack;