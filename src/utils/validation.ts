export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateField(value: any, rules: ValidationRule): ValidationResult {
  const errors: string[] = [];

  // Required validation
  if (rules.required && (!value || value.toString().trim() === "")) {
    errors.push("This field is required");
  }

  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim() === "") {
    return { isValid: errors.length === 0, errors };
  }

  const stringValue = value.toString();

  // Length validations
  if (rules.minLength && stringValue.length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength} characters`);
  }

  if (rules.maxLength && stringValue.length > rules.maxLength) {
    errors.push(`Maximum length is ${rules.maxLength} characters`);
  }

  // Number validations
  if (typeof value === "number") {
    if (rules.min !== undefined && value < rules.min) {
      errors.push(`Minimum value is ${rules.min}`);
    }

    if (rules.max !== undefined && value > rules.max) {
      errors.push(`Maximum value is ${rules.max}`);
    }
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    errors.push("Invalid format");
  }

  // Email validation
  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(stringValue)) {
      errors.push("Invalid email address");
    }
  }

  // URL validation
  if (rules.url) {
    try {
      new URL(stringValue);
    } catch {
      errors.push("Invalid URL");
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateForm(data: Record<string, any>, rules: Record<string, ValidationRule>): {
  isValid: boolean;
  errors: Record<string, string[]>;
} {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const result = validateField(data[field], rules[field]);
    errors[field] = result.errors;
    if (!result.isValid) {
      isValid = false;
    }
  });

  return { isValid, errors };
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  slug: /^[a-z0-9-]+$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  creditCard: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
};

// Common validation rules
export const CommonRules = {
  required: { required: true },
  email: { required: true, email: true },
  password: { 
    required: true, 
    minLength: 8, 
    pattern: ValidationPatterns.password 
  },
  username: { 
    required: true, 
    minLength: 3, 
    maxLength: 20, 
    pattern: ValidationPatterns.username 
  },
  phone: { 
    required: true, 
    pattern: ValidationPatterns.phone 
  },
};
