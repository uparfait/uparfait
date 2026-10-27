import Header from "./modules/header/Header";
import { sections } from "./core/modules";
import useHashScroll from "./hooks/useHashScroll";
import useViewportScale from "./hooks/useViewportScale";

export default function App() {
  useViewportScale();
  useHashScroll();
  return (
    <>
      <Header />
      <main>
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </>
  );
}
