import Filters from "./shared/Filters";
import Header from "./modules/header/Header";
import { sections } from "./core/modules";
import useHashScroll from "./hooks/useHashScroll";

export default function App() {
  useHashScroll();
  return (
    <>
      <Filters />
      <Header />
      <main>
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </>
  );
}
