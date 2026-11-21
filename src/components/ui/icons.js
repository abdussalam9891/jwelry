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

export function SearchIcon({ className = "w-5 h-5" }) {
  return (
    <Outline className={className}>
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

export function CartIcon({ className = "w-5 h-5", strokeWidth }) {
  return (
    <Outline className={className} strokeWidth={strokeWidth}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
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
