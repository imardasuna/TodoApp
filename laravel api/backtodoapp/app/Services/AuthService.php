<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Exceptions\CustomExceptionHandler;
use App\Models\User;
class AuthService
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function register(array $data)
    {
        // Kullanıcı var mı kontrolü
        $existing = $this->userRepo->findByEmail($data['email']);

        if ($existing) {
            // Hata mesajı döndürme
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Bu email zaten kayıtlı.',
                ], 422)
            );
        }

        // Yeni kullanıcıyı oluştur
        return $this->userRepo->create($data);
    }
     public function login(array $credentials): array
    {
        // Kullanıcıyı UserRepository'den doğrula
        $user = $this->userRepo->attemptLogin($credentials);

        if (!$user) {
            throw new \Exception('Email veya şifre hatalı');
        }

        // Token oluştur
        $token = bin2hex(random_bytes(32));

        // Token'ı veritabanına kaydet
        $user->update(['remember_token' => $token]);

        return [
            'user' => $user,
            'message' => 'Giriş başarılı',
            'token' => $token,
        ];
    }
}