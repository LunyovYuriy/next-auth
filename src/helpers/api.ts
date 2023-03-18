const mutationRequest = (method: string, url: string, body: {}) =>
  fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response?.statusText}`);
    })
    .then((data) => data);

const apiRequest = {
  get(url: string) {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status} - ${response?.statusText}`);
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
