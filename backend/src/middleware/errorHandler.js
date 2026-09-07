export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  if (statusCode >= 500) {
    // Log server-side only; never leak internals (stack traces, DB errors) to the client.
    console.error(err);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Something went wrong. Please try again later.' : err.message,
  });
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
