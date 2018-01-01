// TODO: should not be graphql specific
export default (req, { map, endpoint, headers }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(endpoint, {
        headers,
        body: map.request({
          query: req.query,
          variables: req.variables
        }),
        method: "POST"
      });
      const meta = {
        status: response.status,
        receivedAt: Date.now()
      };
      const body = await response.text();

      if (response.status >= 400) {
        return reject({ data: body, meta });
      }

      resolve({
        data: map.response(body, response).data,
        meta
      });
    } catch (err) {
      reject({ message: err.message });
    }
  });
