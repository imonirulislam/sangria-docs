"use client";

import { useId, useState, type ReactNode } from "react";

type Mode = "actionId" | "url";
type Style = "default" | "primary" | "danger";

interface ButtonDraft {
  text: string;
  mode: Mode;
  value: string;
  style: Style;
}

const MAX_BUTTONS = 5;

const newButton = (n: number): ButtonDraft => ({
  text: `Button ${n}`,
  mode: "actionId",
  value: `action_${n}`,
  style: "default",
});

const STYLE_CLASSES: Record<Style, string> = {
  default: "border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100",
  primary: "bg-blue-600 text-white",
  danger: "bg-red-600 text-white",
};

// Only http(s) links render as clickable — mirrors the same check the real
// backend enforces (convex/shared/messageBlocks.ts's isSafeButtonUrl) so this
// preview shows an unsafe link exactly as inert as it'd really render.
const isSafeUrl = (url: string) => /^https?:\/\//i.test(url);

const MRKDWN_RE =
  /<(?<linkUrl>[^|>]+)\|(?<linkLabel>[^>]+)>|<(?<bareUrl>[^>]+)>|`(?<code>[^`]+)`|\*(?<bold>[^*]+)\*|_(?<italic>[^_]+)_|~(?<strike>[^~]+)~/g;

// A small mirror of the real app's src/lib/message-block-text.ts tokenizer —
// duplicated rather than shared, since this docs site and the main app are
// separate deployable repos with no shared-package tooling between them.
// Same rules: single-pass, non-nested, builds React nodes directly (never an
// HTML string).
const renderMrkdwnPreview = (text: string): ReactNode => {
  if (!text) return null;
  const parts: ReactNode[] = [];
  let key = 0;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  MRKDWN_RE.lastIndex = 0;

  const pushPlain = (segment: string) => {
    const lines = segment.split("\n");
    lines.forEach((line, i) => {
      if (line) parts.push(line);
      if (i < lines.length - 1) parts.push(<br key={key++} />);
    });
  };

  while ((match = MRKDWN_RE.exec(text))) {
    if (match.index > lastIndex) pushPlain(text.slice(lastIndex, match.index));
    const g = match.groups!;
    if (g.linkUrl !== undefined) {
      parts.push(
        isSafeUrl(g.linkUrl) ? (
          <a key={key++} href={g.linkUrl} className="underline" target="_blank" rel="noopener noreferrer">
            {g.linkLabel}
          </a>
        ) : (
          match[0]
        ),
      );
    } else if (g.bareUrl !== undefined) {
      parts.push(
        isSafeUrl(g.bareUrl) ? (
          <a key={key++} href={g.bareUrl} className="underline" target="_blank" rel="noopener noreferrer">
            {g.bareUrl}
          </a>
        ) : (
          match[0]
        ),
      );
    } else if (g.code !== undefined) {
      parts.push(
        <code key={key++} className="rounded bg-neutral-200 px-1 text-sm dark:bg-neutral-700">
          {g.code}
        </code>,
      );
    } else if (g.bold !== undefined) {
      parts.push(<strong key={key++}>{g.bold}</strong>);
    } else if (g.italic !== undefined) {
      parts.push(<em key={key++}>{g.italic}</em>);
    } else if (g.strike !== undefined) {
      parts.push(<s key={key++}>{g.strike}</s>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) pushPlain(text.slice(lastIndex));
  return parts;
};

// A live "block builder" (Slack's Block Kit Builder equivalent): write a
// section block's mrkdwn text, pick up to 5 buttons, see a rendered preview,
// and copy the exact `blocks` JSON payload to send with a message. Purely
// client-side — it doesn't talk to a real Sangria backend, it just mirrors
// the payload shape convex/shared/messageBlocks.ts validates.
export const MessageBlockBuilder = () => {
  const [messageText, setMessageText] = useState("Approve this deploy?");
  const [sectionText, setSectionText] = useState(
    "*Deploy #4213* is ready. Triggered by `ci-bot` on `main`. See the <https://example.com/pr/42|full diff>.",
  );
  const [buttons, setButtons] = useState<ButtonDraft[]>([newButton(1)]);
  const [copied, setCopied] = useState(false);
  const idPrefix = useId();

  const updateButton = (index: number, patch: Partial<ButtonDraft>) => {
    setButtons((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  };

  const payload = {
    text: messageText,
    blocks: [
      ...(sectionText.trim() ? [{ type: "section", text: sectionText }] : []),
      {
        type: "actions",
        elements: buttons.map((b) => ({
          type: "button",
          text: b.text,
          style: b.style === "default" ? undefined : b.style,
          ...(b.mode === "url" ? { url: b.value } : { actionId: b.value }),
        })),
      },
    ],
  };

  const payloadJson = JSON.stringify(payload, null, 2);

  const copyPayload = async () => {
    await navigator.clipboard.writeText(payloadJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="not-prose my-6 grid gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor={`${idPrefix}-text`}>
            Message text
          </label>
          <input
            id={`${idPrefix}-text`}
            className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-600 dark:bg-neutral-900"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor={`${idPrefix}-section`}>
            Section text (mrkdwn)
          </label>
          <textarea
            id={`${idPrefix}-section`}
            rows={3}
            className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm font-mono dark:border-neutral-600 dark:bg-neutral-900"
            value={sectionText}
            onChange={(e) => setSectionText(e.target.value)}
            placeholder="*bold* _italic_ ~strike~ `code` <https://example.com|link>"
          />
        </div>

        <div className="flex flex-col gap-3">
          {buttons.map((b, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-md border border-neutral-200 p-2 dark:border-neutral-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">Button {i + 1}</span>
                {buttons.length > 1 && (
                  <button
                    type="button"
                    className="text-xs text-red-600 hover:underline"
                    onClick={() => setButtons((prev) => prev.filter((_, idx) => idx !== i))}
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-900"
                placeholder="Button text"
                value={b.text}
                onChange={(e) => updateButton(i, { text: e.target.value })}
              />
              <div className="flex gap-2">
                <select
                  className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-900"
                  value={b.mode}
                  onChange={(e) => updateButton(i, { mode: e.target.value as Mode })}
                >
                  <option value="actionId">Action ID (fires a callback)</option>
                  <option value="url">URL (plain link)</option>
                </select>
                <select
                  className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm dark:border-neutral-600 dark:bg-neutral-900"
                  value={b.style}
                  onChange={(e) => updateButton(i, { style: e.target.value as Style })}
                >
                  <option value="default">Default</option>
                  <option value="primary">Primary</option>
                  <option value="danger">Danger</option>
                </select>
              </div>
              <input
                className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm font-mono dark:border-neutral-600 dark:bg-neutral-900"
                placeholder={b.mode === "url" ? "https://example.com" : "action_id"}
                value={b.value}
                onChange={(e) => updateButton(i, { value: e.target.value })}
              />
            </div>
          ))}
          {buttons.length < MAX_BUTTONS && (
            <button
              type="button"
              className="self-start rounded-md border border-dashed border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300"
              onClick={() => setButtons((prev) => [...prev, newButton(prev.length + 1)])}
            >
              + Add button (max {MAX_BUTTONS})
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <span className="mb-1 block text-sm font-medium">Preview</span>
          <div className="rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
            <p className="mb-2 text-sm">{messageText}</p>
            {sectionText.trim() && (
              <p className="mb-2 text-sm">{renderMrkdwnPreview(sectionText)}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {buttons.map((b, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ${STYLE_CLASSES[b.style]}`}
                >
                  {b.text || `Button ${i + 1}`}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="block text-sm font-medium">Payload</span>
            <button
              type="button"
              onClick={copyPayload}
              className="rounded-md border border-neutral-300 px-2 py-0.5 text-xs hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="max-h-80 overflow-auto rounded-md bg-neutral-950 p-3 text-xs text-neutral-100">
            <code>{payloadJson}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
