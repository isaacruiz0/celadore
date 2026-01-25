import { createFileRoute } from '@tanstack/react-router';
import FadeInHero from '@/ui/features/Hero';
// import NavBar from '@/components/features/NavBar/NavBar';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <main>
      {/*<NavBar />*/}
      <FadeInHero />
    </main>
  );
}
