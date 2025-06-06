import dynamic from "next/dynamic";

// Dynamically load client-only result page
const ClientResultPage = dynamic(() => import("./client-result"), {
  ssr: false,
});

export default function ResultWrapperPage() {
  return <ClientResultPage />;
}
