interface ErrorResponse {
  error: number;
  message: string;
}

export default class LastFMError extends Error {
  error: number;

  constructor(public response: ErrorResponse) {
    super(response.message);
    this.error = response.error;
  }
}
