// Outline icons shared across components. Each accepts a className.

function Outline({ className, strokeWidth = 1.5, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"
      />
    </Outline>
  );
}

export function CloseIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </Outline>
  );
}

export function HeartIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25Z"
      />
    </Outline>
  );
}

// Shopping bag (used for the cart).
export function CartIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
      />
    </Outline>
  );
}

export function UserIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
      />
    </Outline>
  );
}

export function OrdersIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25V6.108c0-1.135-.845-2.098-1.98-2.193a48.424 48.424 0 0 0-14.04 0C3.845 4.01 3 4.973 3 6.108V8.25m18 0v10.638c0 1.135-.845 2.098-1.98 2.193a48.37 48.37 0 0 1-14.04 0A2.186 2.186 0 0 1 3 18.888V8.25m18 0a48.67 48.67 0 0 0-18 0"
      />
    </Outline>
  );
}

export function ChevronDownIcon({ className = "w-4 h-4", strokeWidth = 2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </Outline>
  );
}

export function ArrowLeftIcon({ className = "w-5 h-5", strokeWidth = 1.8 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </Outline>
  );
}

export function CheckIcon({ className = "w-5 h-5", strokeWidth = 2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </Outline>
  );
}

export function EyeIcon({ className = "w-5 h-5" }) {
  return (
    <Outline className={className} strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
      <circle cx="12" cy="12" r="3" />
    </Outline>
  );
}

export function StarIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.838-.196-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.176 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
}

export function Spinner({ className = "w-5 h-5" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// Thin line icons for the category row (Fine-jewellery style, 24px grid).

export function GemIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 4h11l3.5 5-9 11L3 9l3.5-5Zm-3.5 5h18M9 4 7.5 9 12 20l4.5-11L15 4"
      />
    </Outline>
  );
}

export function RingIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="14.5" r="6.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 8.5 8.5 5.5 10 3.5h4l1.5 2-1 3m-6-3h7"
      />
    </Outline>
  );
}

export function EarringIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="4" r="1.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5.5V9m0 0-4 6.5a4 4 0 0 0 8 0L12 9Zm0 12.5V20"
      />
    </Outline>
  );
}

export function NecklaceIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 3c0 6 3.5 10 8 10s8-4 8-10M12 13v1.5m0 0-2.5 3L12 21l2.5-3.5-2.5-3Z"
      />
    </Outline>
  );
}

export function BraceletIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <ellipse cx="12" cy="12" rx="9" ry="6" />
      <ellipse cx="12" cy="12" rx="6.5" ry="3.8" />
    </Outline>
  );
}

export function CollectionsIcon({ className = "w-5 h-5", strokeWidth = 1.2 }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 11.25h16.5v9H3.75zm-.75-4.5h18v4.5H3zm9 0v13.5m0-13.5c-1-2.5-5-4-5-1.5 0 1.5 5 1.5 5 1.5Zm0 0c1-2.5 5-4 5-1.5 0 1.5-5 1.5-5 1.5Z"
      />
    </Outline>
  );
}
