const KEY = "plan-then-code";

export function reveal(sealed) {
  const bytes = atob(sealed);
  let text = "";
  for (let i = 0; i < bytes.length; i++) text += String.fromCharCode(bytes.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length));
  return text;
}
