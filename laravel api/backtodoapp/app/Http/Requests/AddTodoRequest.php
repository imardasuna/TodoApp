<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
class AddTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $token = $this->header('Authorization');

        if (!$token) {
            return false; // Token eksikse yetkilendirme başarısız
        }

        $token = str_replace('Bearer ', '', $token);

        $user = User::where('remember_token', $token)->first();

        if (!$user) {
            return false; 
        }

        // Kullanıcıyı oturumda ayarla (isteğe bağlı)
        auth()->login($user);

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
