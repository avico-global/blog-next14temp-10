import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={`container mx-auto max-w-7xl ${className}`}>{children}</div>
  );
}
