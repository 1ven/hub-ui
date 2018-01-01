// TODO: should not be graphql specific
export default (req, { map, endpoint, headers }) =>
  new Promise(async (resolve, reject) => {
    try {
      // graphql specific. move to separate package, and use in middleware
      const response = await fetch(endpoint, {
        headers,
        body: map.request({
          query: req.query,
          variables: req.variables
        }),
        method: "POST"
      });
      //
      const body = await response.text();

      if (response.status >= 400) {
        return reject({ data: body });
      }

      resolve(map.response(body, response).data);
    } catch (err) {
      reject({ message: err.message });
    }
  });
