function Preferences({
  formData,
  setFormData,
  errors,
  validateField,
}) {
  return (
    <div>
      <h2>Preferences</h2>

      
      <div>
        <label>Primary Track</label>
        <br />

        <select
          value={formData.track}
          onChange={(e) =>
            setFormData({
              ...formData,
              track: e.target.value,
              techStack: [],
            })
          }
          onBlur={(e) =>
            validateField(
              "track",
              e.target.value
            )
          }
        >
          <option value="">
            Select your track
          </option>

          <option value="Frontend">
            Frontend
          </option>

          <option value="Backend">
            Backend
          </option>

          <option value="Fullstack">
            Fullstack
          </option>

          <option value="UI/UX Design">
            UI/UX Design
          </option>
        </select>

        {errors.track && (
          <p style={{ color: "red" }}>
            {errors.track}
          </p>
        )}
      </div>

      <br />

      
      <div>
        <label>Experience Level</label>
        <br />

        <select
          value={formData.experience}
          onChange={(e) =>
            setFormData({
              ...formData,
              experience: e.target.value,
            })
          }
          onBlur={(e) =>
            validateField(
              "experience",
              e.target.value
            )
          }
        >
          <option value="">
            Select experience
          </option>

          <option value="Junior">
            Junior
          </option>

          <option value="Mid">
            Mid
          </option>

          <option value="Senior">
            Senior
          </option>
        </select>

        {errors.experience && (
          <p style={{ color: "red" }}>
            {errors.experience}
          </p>
        )}
      </div>
    </div>
  );
}

export default Preferences;