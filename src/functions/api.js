export function delay(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line consistent-return
export async function callApiWithRetry(url, options = {}, numRetries = 2, delayTime = 2000) {
  try {
    const response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      return response.json();
    }
    throw new Error();
  } catch (e) {
    if (numRetries > 0) {
      await delay(2000);
      return callApiWithRetry(url, options, numRetries - 1, delayTime);
    }
    throw new Error(e);
  }
}
