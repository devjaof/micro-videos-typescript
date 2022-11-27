export default class InvalidUuidError extends Error{
  constructor(message?: string) {
    // o super chama o construtor do extends -> Error
    super(message || 'Id must be a valid UUID');
    this.name = 'Invalid UUID';
  }
}