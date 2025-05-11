<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Models\User;
use App\Repositories\UserRepository;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Exceptions\CustomExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->register($request->validated());
            return response()->json(['message' => 'Kayıt başarılı', 'user' => $user], 201);
        } catch (HttpResponseException $e) {
            // Eğer HttpResponseException ise, response'u olduğu gibi döndür
            return $e->getResponse();
        } catch (\Exception $e) {
            // Diğer hatalar için genel hata mesajı
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function login(LoginRequest $request)
    {
    try {
        $result = $this->authService->login($request->only('email', 'password'));

        return response()->json([
            'status' => true,
            'user' => $result['user'],
            'token' => $result['token'],
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage(),
        ], 400);
    }
    }
}
