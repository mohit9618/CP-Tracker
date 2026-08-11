import Sidebar from "../../components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="flex bg-[#080D1C] min-h-screen">
    <Sidebar />

    <main className="flex-1 ml-64 bg-[#0B1020] min-h-screen">
      {children}
    </main>
  </div>
);
}