export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) {
    return false;
  }
  return EMAIL_REGEX.test(trimmed);
}

export function validateContactPayload(
  payload: unknown
): ValidationResult<ContactPayload> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "Invalid request payload. Expected a JSON object.",
    };
  }

  const record = payload as Record<string, unknown>;
  const rawName = typeof record.name === "string" ? record.name.trim() : "";
  const rawEmail = typeof record.email === "string" ? record.email.trim() : "";
  const rawSubject =
    typeof record.subject === "string" ? record.subject.trim() : "";
  const rawMessage =
    typeof record.message === "string" ? record.message.trim() : "";

  const fieldErrors: Record<string, string> = {};

  if (!rawName) {
    fieldErrors.name = "Name is required.";
  } else if (rawName.length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  } else if (rawName.length > 100) {
    fieldErrors.name = "Name must be 100 characters or fewer.";
  }

  if (!rawEmail) {
    fieldErrors.email = "Email is required.";
  } else if (!isValidEmail(rawEmail)) {
    fieldErrors.email = "Please provide a valid email address.";
  }

  if (rawSubject.length > 150) {
    fieldErrors.subject = "Subject must be 150 characters or fewer.";
  }

  if (!rawMessage) {
    fieldErrors.message = "Message is required.";
  } else if (rawMessage.length < 10) {
    fieldErrors.message = "Message must be at least 10 characters.";
  } else if (rawMessage.length > 3000) {
    fieldErrors.message = "Message must be 3000 characters or fewer.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    const firstError = Object.values(fieldErrors)[0];
    return {
      valid: false,
      error: firstError,
      fieldErrors,
    };
  }

  return {
    valid: true,
    data: {
      name: rawName,
      email: rawEmail.toLowerCase(),
      subject: rawSubject || "Portfolio Inquiry",
      message: rawMessage,
    },
  };
}

export function validateNewsletterPayload(
  payload: unknown
): ValidationResult<{ email: string }> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      valid: false,
      error: "Invalid request payload.",
    };
  }

  const record = payload as Record<string, unknown>;
  const rawEmail = typeof record.email === "string" ? record.email.trim() : "";

  if (!rawEmail) {
    return {
      valid: false,
      error: "Email is required to subscribe.",
    };
  }

  if (!isValidEmail(rawEmail)) {
    return {
      valid: false,
      error: "Please enter a valid email address.",
    };
  }

  return {
    valid: true,
    data: {
      email: rawEmail.toLowerCase(),
    },
  };
}
