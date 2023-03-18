import IRequestError from '@/src/interfaces/IRequestError';
const mutationRequest = (method: string, url: string, body: {}) =>
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }

      const errorResponse = await response.json();
      const error: IRequestError = {
        status: response?.status,
        statusText: response?.statusText,
        data: errorResponse,
      };

      throw error;
    })
    .then((data) => data);

const apiRequest = {
  get(url: string) {
    return fetch(url)
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const errorResponse = await response.json();
        const error: IRequestError = {
          status: response?.status,
          statusText: response?.statusText,
          data: errorResponse,
        };

        throw error;
      })
      .then((data) => data);
  },
  post(url: string, body: {}) {
    return mutationRequest('POST', url, body);
  },
  patch(url: string, body: {}) {
    return mutationRequest('PATCH', url, body);
  },
  delete(url: string, body: {}) {
    return mutationRequest('DELETE', url, body);
  },
};

export default apiRequest;
