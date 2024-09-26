import Header from "@/components/common/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="row-start-2 mt-16 flex flex-col items-center gap-8 sm:items-start">
        <div className="h-[5000px]"></div>
      </main>
    </div>
  );
}
