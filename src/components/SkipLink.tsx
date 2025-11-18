'use client';

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent-primary focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded-md"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
