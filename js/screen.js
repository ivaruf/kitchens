/*
 * screen.js — the fullscreen plate in the corner (#corner).
 *
 * SELF-CONTAINED: imports nothing, exports nothing, loaded as its own module
 * so a game that fails to boot still keeps the button that makes it bigger.
 * NOT NAMED fullscreen.js — a default uBlock list bans that basename across
 * github.io, and one blocked file is a blank game (hub CLAUDE.md §2).
 *
 * Shown only once a working request/exit pair answers: iPhone Safari has no
 * element fullscreen, and a button that does nothing is worse than none. The
 * label and aria-pressed are repainted from fullscreenchange, because Escape
 * and the browser's own chrome leave fullscreen without touching the button,
 * and CSS swaps the glyph off the same aria-pressed so the two cannot drift.
 *
 * NO ORIENTATION LOCK, unlike the arcade games that pin landscape. A tablet
 * propped against the splashback is as likely upright as sideways, and the
 * kitchen lays itself out for both.
 */

const button = document.getElementById("screen-toggle");
const root = document.documentElement;
const request = root.requestFullscreen || root.webkitRequestFullscreen || null;
const exit = document.exitFullscreen || document.webkitExitFullscreen || null;

function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function paint() {
  const active = isFullscreen();
  const label = active ? "Exit fullscreen" : "Fullscreen";
  button.setAttribute("aria-pressed", String(active));
  button.setAttribute("aria-label", label);
  button.title = label;
}

if (button && request && exit) {
  button.hidden = false;
  paint();
  button.addEventListener("click", () => {
    // Both calls may return a promise a permissions policy or a declined
    // prompt rejects; fullscreenchange reports what really happened, so the
    // rejection is swallowed rather than reaching the crash bar.
    const result = isFullscreen() ? exit.call(document) : request.call(root);
    if (result && typeof result.catch === "function") result.catch(() => {});
  });
  document.addEventListener("fullscreenchange", paint);
  document.addEventListener("webkitfullscreenchange", paint);
}
