import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/experiences/youtube/themes/watch/')({
  component: Watch,
  validateSearch: (search) => ({
    id: String(search.id ?? ''),
    themeId: String(search.themeId ?? ''),
  }),
});

function Watch() {
  return <div>Hello "/experiences/youtube/themes/watch/"!</div>;
}
