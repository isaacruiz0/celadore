import { createFileRoute } from '@tanstack/react-router';
import Hero from '@/ui/markup/Hero';
// import NavBar from '@/components/features/NavBar/NavBar';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <main>
      {/*<NavBar />*/}
      <Hero />
    </main>
  );
}
