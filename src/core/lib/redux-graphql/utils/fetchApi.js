// graphql specific
export default (req, { map, endpoint, headers }, onSuccess, onError) => {
  fetch(endpoint, {
    headers,
    body: map.request({
      query: req.query,
      variables: req.variables
    }),
    method: "POST"
  })
    .then(response =>
      response
        .text()
        .then(body => ({ response, body: map.response(body, response) }))
    )
    .then(({ response, body }) => {
      const meta = {
        status: response.status,
        receivedAt: Date.now()
      };

      if (response.status >= 400) {
        return onError(void 0, body, meta);
      }

      onSuccess(body.data, meta);
    })
    .catch(err => onError(err.message));
};
