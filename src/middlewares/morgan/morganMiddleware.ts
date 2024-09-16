import morgan, { StreamOptions } from "morgan";

import winstonLogger from "../../config/winston/winston.js";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => winstonLogger.http(message),
};

morgan.token('client-ip', (req) => {
  return `IP: ${req.socket.remoteAddress}:${req.socket.remotePort} /` || '-';
});
morgan.token('client-url', (req) => {
  return `URL: - ${req.url}`;
});

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":client-ip :client-url :method :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleware;