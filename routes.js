const fs = require("fs");
const http = require("http");

/**
 * Simple process incoming request.
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} resp
 * @returns
 */
const processRequest = (req, resp) => {
  // console.log(req);
  //?? exit the `event loop`
  // process.exit();

  /// Some request useful `attrs`:
  // console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    /// Sending response:
    resp.setHeader("Content-Type", "text/html");
    resp.write(`
    <!DOCTYPE html>
    <html>
      <body>
        <h2>HTML Forms</h2>

        <form action="/message" method="POST">
          <label for="name">Hello</label><br />
          <input type="text" id="name" name="name" value="John" /><br />
          <input type="submit" value="Submit" />
        </form>

        <p>
          If you click the "Submit" button, the form-data will be sent to a page
          called "/message".
        </p>
      </body>
    </html>
    `);
    return resp.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    // parse body
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      fs.writeFileSync("body.log", data); // Blocking until finished before executing next statement.

      //!! this is callback function, so (***) should not call here
    });

    // redirect (***)
    resp.statusCode = 302;
    resp.setHeader("Location", "/");
    return resp.end();
  }

  resp.setHeader("Content-Type", "text/html");
  resp.write(`URL => ${req.url}, Hello World!`);
  resp.end();
};

//?? shorthand: exports.routes = processRequest;
module.exports = processRequest;
