export default function SkillTabs({ groups, active, onSelect }) {
  const move = (e, index) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = groups[(index + step + groups.length) % groups.length];
    onSelect(next.id);
    document.getElementById(`skill-tab-${next.id}`)?.focus();
  };
  return (
    <div className="skill-tabs" role="tablist">
      {groups.map((group, index) => {
        const selected = group.id === active;
        return (
          <button
            key={group.id}
            id={`skill-tab-${group.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="skill-panel"
            tabIndex={selected ? 0 : -1}
            className={`skill-tab${selected ? " active" : ""}`}
            onClick={() => onSelect(group.id)}
            onKeyDown={(e) => move(e, index)}
          >
            {group.label}
            <span className="skill-count">{group.items.length}</span>
          </button>
        );
      })}
    </div>
  );
}
