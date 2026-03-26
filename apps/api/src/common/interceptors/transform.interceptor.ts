import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* ─────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────── */

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface StandardResponse<T> {
  success: true;
  statusCode: number;
  data: T;
  timestamp: string;
}

export interface StandardPaginatedResponse<T> {
  success: true;
  statusCode: number;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
}

/* ─────────────────────────────────────────────────────────────
 * Type Guard (NO any used)
 * ───────────────────────────────────────────────────────────── */

function isPaginated<T>(data: unknown): data is PaginatedResponse<T> {
  if (typeof data !== 'object' || data === null) return false;

  const maybe = data as Record<string, unknown>;

  return (
    Array.isArray(maybe.items) &&
    typeof maybe.meta === 'object' &&
    maybe.meta !== null &&
    'total' in maybe.meta &&
    'page' in maybe.meta &&
    'limit' in maybe.meta &&
    'totalPages' in maybe.meta
  );
}

/* ─────────────────────────────────────────────────────────────
 * Interceptor
 * ───────────────────────────────────────────────────────────── */

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T | PaginatedResponse<T>,
  StandardResponse<T> | StandardPaginatedResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | PaginatedResponse<T>>
  ): Observable<StandardResponse<T> | StandardPaginatedResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // ✅ Pagination response
        if (isPaginated<T>(data)) {
          return {
            success: true,
            statusCode,
            data: data.items,
            meta: data.meta,
            timestamp: new Date().toISOString()
          };
        }

        // ✅ Normal response
        return {
          success: true,
          statusCode,
          data,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
