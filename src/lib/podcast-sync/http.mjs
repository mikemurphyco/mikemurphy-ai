export async function requestJson(url, options = {}, { attempts = 3 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    let retryDelay = 500 * (2 ** (attempt - 1));
    try {
      const response = await fetch(url, options);
      if (response.ok) return response.status === 204 ? null : response.json();

      const responseText = (await response.text()).slice(0, 1000);
      const error = new Error(`${options.method ?? 'GET'} ${url} returned ${response.status}: ${responseText}`);
      if (response.status !== 429 && response.status < 500) throw error;
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get('retry-after'));
        retryDelay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 5000 * attempt;
      }
      lastError = error;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
    }

    await new Promise((resolve) => setTimeout(resolve, retryDelay));
  }

  throw lastError;
}

export function pause(milliseconds = 150) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
