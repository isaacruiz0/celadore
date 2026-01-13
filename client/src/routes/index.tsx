import { createFileRoute } from '@tanstack/react-router';
import FadeInHero from '@/components/Hero';
import NavBar from '@/components/NavBar/NavBar';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <main>
      <NavBar />
      <FadeInHero />
    </main>
  );
}
