const container = new Map();

export function register(id, Component) {
  container.set(id, Component);
}

export function resolve(id) {
  return container.get(id);
}

export function resolveAll(ids) {
  return ids.map((id) => ({ id, Component: container.get(id) }));
}
