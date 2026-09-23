function PersonalInfo({
  formData,
  setFormData,
  errors,
  validateField,
}) {
  return (
    <div>
      <h2>Personal Information</h2>

     
      <div>
        <label>Name</label>
        <br />

        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          onBlur={(e) =>
            validateField(
              "name",
              e.target.value
            )
          }
          placeholder="Enter your name"
        />

        {errors.name && (
          <p style={{ color: "red" }}>
            {errors.name}
          </p>
        )}
      </div>

      <br />

      
      <div>
        <label>Email</label>
        <br />

        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          onBlur={(e) =>
            validateField(
              "email",
              e.target.value
            )
          }
          placeholder="Enter your email"
        />

        {errors.email && (
          <p style={{ color: "red" }}>
            {errors.email}
          </p>
        )}
      </div>

      <br />

      <div>
        <label>Portfolio / GitHub</label>
        <br />

        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) =>
            setFormData({
              ...formData,
              portfolio: e.target.value,
            })
          }
          onBlur={(e) =>
            validateField(
              "portfolio",
              e.target.value
            )
          }
          placeholder="https://github.com/..."
        />

        {errors.portfolio && (
          <p style={{ color: "red" }}>
            {errors.portfolio}
          </p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;