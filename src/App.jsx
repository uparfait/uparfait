import Header from "./modules/header/Header";
import { order, sections } from "./core/modules";
import useActiveSection from "./hooks/useActiveSection";
import useHashSync from "./hooks/useHashSync";
import useViewportScale from "./hooks/useViewportScale";

export default function App() {
  useViewportScale();
  const active = useActiveSection(order);
  useHashSync(active, order[0]);
  return (
    <>
      <Header active={active} />
      <main>
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </>
  );
}
