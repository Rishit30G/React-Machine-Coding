/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((res, rej) => {
    const retry = () => {
      fetcher()
        .then((result) => res(result))
        .catch((error) => {
          if (maximumRetryCount > 0) {
            maximumRetryCount--;
          } else {
            rej(error);
          }
        });
    };
    retry();
  });
}

