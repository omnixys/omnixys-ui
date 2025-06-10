import AnalyticsSidebar from "../../components/AnalyticsSidebar";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <AnalyticsSidebar />
      <main style={{ flexGrow: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
