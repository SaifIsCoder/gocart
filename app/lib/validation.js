// Validation utilities for form fields

// Validate email - must contain @ symbol
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  
  // Check if email contains @ symbol
  if (!email.includes("@")) {
    return "Email must contain @ symbol";
  }
  
  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  
  return null; // Valid
};

// Validate text field - should not contain numbers
export const validateText = (text, fieldName = "Field") => {
  if (!text || !text.trim()) {
    return `${fieldName} is required`;
  }
  
  // Check if text contains numbers
  const hasNumbers = /\d/.test(text);
  if (hasNumbers) {
    return `${fieldName} should not contain numbers`;
  }
  
  // Check if text contains only letters, spaces, and common punctuation
  const textRegex = /^[a-zA-Z\s\-'.,]+$/;
  if (!textRegex.test(text.trim())) {
    return `${fieldName} should only contain letters and spaces`;
  }
  
  return null; // Valid
};

// Validate username - no numbers, no special chars except underscore
export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return "Username is required";
  }
  
  if (username.toLowerCase().trim() === "admin") {
    return "Username 'admin' is not allowed";
  }
  
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  
  // Username can contain letters, numbers, and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return "Username can only contain letters, numbers, and underscore";
  }
  
  return null; // Valid
};

// Validate phone number
export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  
  // Allow numbers, spaces, dashes, parentheses, and +
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(phone)) {
    return "Invalid phone number format";
  }
  
  return null; // Valid
};

// Validate password
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  
  return null; // Valid
};

// Real-time validation for text input (prevents numbers)
export const handleTextInput = (e, setValue, setError, fieldName) => {
  const value = e.target.value;
  
  // Allow only letters, spaces, and common punctuation
  const textOnlyRegex = /^[a-zA-Z\s\-'.,]*$/;
  
  if (textOnlyRegex.test(value) || value === "") {
    setValue(value);
    // Clear error when user starts typing valid input
    if (setError) {
      setError("");
    }
  } else {
    // Don't update value if it contains invalid characters
    if (setError) {
      setError(`${fieldName} should not contain numbers or special characters`);
    }
  }
};

// Real-time validation for email input
export const handleEmailInput = (e, setValue, setError) => {
  const value = e.target.value;
  setValue(value);
  
  if (value && !value.includes("@")) {
    if (setError) {
      setError("Email must contain @ symbol");
    }
  } else if (value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      if (setError) {
        setError("Invalid email format");
      }
    } else {
      if (setError) {
        setError("");
      }
    }
  } else {
    if (setError) {
      setError("");
    }
  }
};

