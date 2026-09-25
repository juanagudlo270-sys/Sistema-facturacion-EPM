// Error controlado: lleva un código HTTP para que el errorHandler responda bien
export class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}
