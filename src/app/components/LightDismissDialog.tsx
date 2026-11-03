"use client";

import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

export interface DialogRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Pure coordinate helper for the `<dialog closedby="any">` fallback on browsers
 * that do not support `HTMLDialogElement.prototype.closedBy` (e.g. Safari).
 */
export function isClickInsideDialogBounds(
  rect: DialogRect,
  clientX: number,
  clientY: number
): boolean {
  return (
    rect.top <= clientY &&
    clientY <= rect.top + rect.height &&
    rect.left <= clientX &&
    clientX <= rect.left + rect.width
  );
}

interface LightDismissDialogProps {
  isOpen: boolean;
  onClose: () => void;
  titleId?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function LightDismissDialog({
  isOpen,
  onClose,
  titleId,
  title,
  subtitle,
  children,
}: LightDismissDialogProps) {
  const generatedId = useId();
  const resolvedTitleId = titleId ?? generatedId;
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    } else if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    // MANDATORY (light-dismiss-a-dialog): Fallback for browsers without native <dialog closedby="any"> support
    let handleBackdropClick: ((event: MouseEvent) => void) | null = null;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (isClickInsideDialogBounds(rect, event.clientX, event.clientY)) {
          return;
        }
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby={resolvedTitleId}
      className="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0E1012] text-[#090A0B] dark:text-[#F7F8F8] border border-zinc-200 dark:border-white/[0.1] shadow-2xl p-0 m-auto overflow-hidden"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0E1012]/95 backdrop-blur-md px-6 py-4">
        <div>
          <h2
            id={resolvedTitleId}
            className="text-lg sm:text-xl font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8]"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-mono text-zinc-500 dark:text-[#8A8F98] mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close modal"
            className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.1] text-zinc-500 hover:text-zinc-900 dark:text-[#8A8F98] dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1A1B1E]"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      </div>
      <div className="max-h-[78vh] overflow-y-auto px-6 py-6">{children}</div>
    </dialog>
  );
}
