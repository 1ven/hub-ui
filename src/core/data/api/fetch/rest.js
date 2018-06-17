export default ({ path, method, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(process.env.REACT_APP_API + path, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          authorization: `Bearer 02c6b6f8d1f87d2fab48090b92bc1463dd42ef04`,
          "content-type": "application/json"
        }
      });
      const data = await response.text();

      if (response.status >= 400) {
        return reject({ data });
      }

      resolve(JSON.parse(data));
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
