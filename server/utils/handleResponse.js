/**
 * 
 * @param {object} res - the response object
 * @param {object} data - the response object sent to the client
 * * @param {number} code - the status code of the response
 */
export function handleSuccess(res, data, code) {
  return res.status(code).send(data);
}

/**
 * @param {object} res - the response object
 * @param {object} data - the response object sent to the client
 * @param {number} code - the status code of the response
 */
export function handleError(res, data, code) {
  return res.status(code).send(data);
}
