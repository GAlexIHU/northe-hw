import React from "react";

export default function ErrorMessage({ message }: { message: string | null }) {
  if (message) {
    return (
      <p role="alert" className="text-red-600 text-sm pt-2">
        {message}
      </p>
    );
  } else {
    return <div className="h-[30px]"></div>;
  }
}
