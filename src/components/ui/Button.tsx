"use client";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant: ButtonVariant;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  variant,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant}`}
    >
      {text}
    </button>
  );
}