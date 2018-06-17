export default ({ query, variables }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          authorization: `Bearer 02c6b6f8d1f87d2fab48090b92bc1463dd42ef04`,
          "content-type": "application/json"
        },
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();

      if (response.status >= 400) {
        return reject({ data: body });
      }

      resolve(JSON.parse(body).data);
    } catch (err) {
      reject({ message: err.message });
    }
  });
