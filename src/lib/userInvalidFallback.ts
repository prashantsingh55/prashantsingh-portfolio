// MANDATORY (validate-input-after-interaction):
// 1. Sync aria-invalid with native :user-invalid state on blur and input.
// 2. Provide WeakMap-based UserInvalidFallback for browsers without :user-invalid support.

type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface InteractionState {
  hasInteracted: boolean;
  hasBlurred: boolean;
}

const dirtyState = new WeakMap<EventTarget, InteractionState>();

function isFormControl(el: unknown): el is FormControlElement {
  return (
    typeof el === "object" &&
    el !== null &&
    "checkValidity" in el &&
    typeof (el as FormControlElement).checkValidity === "function"
  );
}

export function syncAriaInvalid(el: unknown): void {
  if (!isFormControl(el)) return;

  let isUserInvalid = false;
  try {
    if (
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("selector(:user-invalid)")
    ) {
      isUserInvalid = el.matches(":user-invalid");
    } else {
      isUserInvalid =
        el.classList.contains("user-invalid-fallback") || !el.checkValidity();
    }
  } catch {
    isUserInvalid = !el.checkValidity();
  }

  el.setAttribute("aria-invalid", isUserInvalid ? "true" : "false");
}

function updateFallbackState(input: FormControlElement): void {
  const isValid = input.checkValidity();
  input.classList.toggle("user-invalid-fallback", !isValid);
  input.classList.toggle("user-valid-fallback", isValid);

  if (!isValid) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

export function attachFormValidationHandlers(
  form: HTMLFormElement | null
): () => void {
  if (!form || typeof window === "undefined") {
    return () => {};
  }

  const supportsUserInvalid =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("selector(:user-invalid)");

  const handleBlur = (event: Event) => {
    const target = event.target;
    if (!isFormControl(target)) return;

    if (!supportsUserInvalid) {
      const state = dirtyState.get(target) || {
        hasInteracted: false,
        hasBlurred: false,
      };
      state.hasBlurred = true;
      dirtyState.set(target, state);
      if (state.hasInteracted) {
        updateFallbackState(target);
      }
    } else {
      syncAriaInvalid(target);
    }
  };

  const handleInputOrChange = (event: Event) => {
    const target = event.target;
    if (!isFormControl(target)) return;

    if (!supportsUserInvalid) {
      const state = dirtyState.get(target) || {
        hasInteracted: false,
        hasBlurred: false,
      };
      state.hasInteracted = true;
      dirtyState.set(target, state);
      if (state.hasBlurred) {
        updateFallbackState(target);
      }
    } else if (target.hasAttribute("aria-invalid")) {
      syncAriaInvalid(target);
    }
  };

  const handleReset = () => {
    const controls = Array.from(form.elements);
    for (const control of controls) {
      dirtyState.delete(control);
      control.classList.remove("user-invalid-fallback", "user-valid-fallback");
      control.removeAttribute("aria-invalid");
    }
  };

  form.addEventListener("blur", handleBlur, true);
  form.addEventListener("input", handleInputOrChange);
  form.addEventListener("change", handleInputOrChange);
  form.addEventListener("reset", handleReset, true);

  return () => {
    form.removeEventListener("blur", handleBlur, true);
    form.removeEventListener("input", handleInputOrChange);
    form.removeEventListener("change", handleInputOrChange);
    form.removeEventListener("reset", handleReset, true);
  };
}
