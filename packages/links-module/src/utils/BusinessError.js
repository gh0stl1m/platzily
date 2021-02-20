class BusinessError extends Error {
  constructor(message, moduleName) {
    super(message);

    this.moduleName = moduleName;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports = BusinessError;
