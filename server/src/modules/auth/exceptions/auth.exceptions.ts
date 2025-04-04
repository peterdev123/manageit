import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super('Token has expired');
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid token provided');
  }
}

export class TokenMissingException extends UnauthorizedException {
  constructor() {
    super('Authentication token is missing');
  }
}