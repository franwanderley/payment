import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Request, Response } from 'express';

// TODO tirar unknown depois
interface CachedResponse {
  response: unknown;
  statusCode: number;
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, CachedResponse>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const rawIdempotencyKey = request.headers['idempotency-key'];
    const idempotencyKey = Array.isArray(rawIdempotencyKey)
      ? rawIdempotencyKey[0]
      : rawIdempotencyKey;

    if (!['POST', 'PATCH'].includes(request.method)) {
      return next.handle();
    }

    if (!idempotencyKey) {
      throw new BadRequestException('idempotency-key header is required');
    }

    const cachedResponse = this.cache.get(idempotencyKey);

    if (cachedResponse) {
      console.log(
        `Idempotency key '${idempotencyKey}' found in cache. Returning cached response.`,
      );
      response.status(cachedResponse.statusCode);
      return of(cachedResponse.response);
    }

    console.log(
      `Idempotency key '${idempotencyKey}' not found in cache. Processing request.`,
    );

    return next.handle().pipe(
      tap((res: unknown) => {
        const statusCode = response.statusCode;
        this.cache.set(idempotencyKey, { response: res, statusCode });
      }),
    );
  }
}
