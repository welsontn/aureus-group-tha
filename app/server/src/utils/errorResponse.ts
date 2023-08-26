class ErrorResponse extends Error {  
  code: number;

  constructor (code: number, message:string) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

    // Response Code
    this.code = code
  }
}

export default ErrorResponse;