function delay(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callApiWithRetry(url, options = {}, numRetries = 2, delayTime = 2000) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    if (numRetries > 0) {
      await delay(2000);
      return callApiWithRetry(url, options, numRetries - 1, delayTime);
    }
    return new Error(e);
  }
}
