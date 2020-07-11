import { path } from "ramda";

const logError = error => {
  console.log(`
    ==================
    ${path(["config", "url"], error)}
    ${path(["response", "status"]), error} - ${path(["response", "statusText"], error)}
    ${error.Error}
  `);
}

export default logError;
