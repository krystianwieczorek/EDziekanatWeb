import configuration from "../config.json";

try {
  const configurationOverride = require("../config.override.json");
  Object.assign(configuration, configurationOverride);
} catch (e) {}

export default configuration;
