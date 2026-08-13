export interface VideoChapter {
  label: string;
  seconds: number;
  timestamp: string;
}

export function getYouTubeId(value: string): string | null {
  const input = value.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    const hostname = url.hostname.replace(/^www\./, '');
    let candidate: string | null = null;

    if (hostname === 'youtu.be') {
      candidate = url.pathname.split('/').filter(Boolean)[0] ?? null;
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        candidate = url.searchParams.get('v');
      } else {
        const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
        candidate = match?.[1] ?? null;
      }
    }

    return candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

function timestampToSeconds(timestamp: string, lineNumber: number) {
  const parts = timestamp.split(':').map(Number);
  const seconds = parts.at(-1) ?? 0;
  const minutes = parts.at(-2) ?? 0;
  const hours = parts.length === 3 ? parts[0] : 0;

  if (seconds >= 60 || (parts.length === 3 && minutes >= 60)) {
    throw new Error(`line ${lineNumber} has an invalid timestamp: "${timestamp}"`);
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export function parseVideoChapters(source: string): VideoChapter[] {
  const lines = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error('chapters must contain at least one timestamp');
  }

  const chapters = lines.map((line, index) => {
    const match = line.match(/^((?:\d{1,3}:)?\d{1,3}:\d{2})\s+(.+)$/);

    if (!match) {
      throw new Error(
        `line ${index + 1} must use "MM:SS Chapter title" or "HH:MM:SS Chapter title"`,
      );
    }

    const [, timestamp, label] = match;

    return {
      label: label.trim(),
      seconds: timestampToSeconds(timestamp, index + 1),
      timestamp,
    };
  });

  if (chapters[0].seconds !== 0) {
    throw new Error('the first chapter must begin at 00:00');
  }

  for (let index = 1; index < chapters.length; index += 1) {
    if (chapters[index].seconds <= chapters[index - 1].seconds) {
      throw new Error(`line ${index + 1} must be later than the previous chapter`);
    }
  }

  return chapters;
}

export function youtubeTimestampUrl(videoId: string, seconds: number) {
  return `https://youtu.be/${videoId}?t=${seconds}`;
}
