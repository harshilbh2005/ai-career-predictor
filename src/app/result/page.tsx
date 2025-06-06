import { Suspense } from "react";
import ClientResult from "./client-result";

export default function ResultWrapperPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading result...</div>}
    >
      <ClientResult />
    </Suspense>
  );
}
