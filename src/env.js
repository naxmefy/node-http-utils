/**
 * A utility to get an env var or if undefined the default value if given.
 * @param {String} envVarString The string of the env var to fetch
 * @param {*} [defaultValue] A default value that will be returned if env var is undefined
 * @returns {*}
 */
export default function env (envVarString, defaultValue) {
  return process.env[envVarString] || defaultValue
}
