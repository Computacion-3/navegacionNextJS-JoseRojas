import { Header } from '@/src/shared/components/layout/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl p-4 md:p-6">{children}</main>
    </>
  );
}