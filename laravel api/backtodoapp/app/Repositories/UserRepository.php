<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function create(array $data)
    {
        return User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }
    public function attemptLogin(array $credentials): ?User
    {
        $user = $this->findByEmail($credentials['email']);

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return $user;
        }

        return null;
    }
    
}