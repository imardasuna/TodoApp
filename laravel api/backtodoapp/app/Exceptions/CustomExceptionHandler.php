<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CustomExceptionHandler
{
    public static function handle(Throwable $e, Request $request): JsonResponse
    {
        // Özel tanımlı exception'lara göre dönecek mesajlar
        if ($e instanceof EmailAlreadyExistsException) {
            return response()->json([
                'message' => 'Bu email zaten kayıtlı.',
            ], 422);
        }

        if ($e instanceof \Illuminate\Validation\ValidationException) {
            return response()->json([
                'message' => 'Doğrulama hatası.',
                'errors' => $e->errors(),
            ], 422);
        }

        if ($e instanceof \Illuminate\Auth\AuthenticationException) {
            return response()->json([
                'message' => 'Giriş yapmanız gerekiyor.',
            ], 401);
        }

        // Genel hata (fallback)
        return response()->json([
            'message' => $e->getMessage() ?: 'Sunucu hatası.',
        ], 500);
    }
}
