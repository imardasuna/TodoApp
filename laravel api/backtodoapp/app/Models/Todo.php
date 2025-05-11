<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Todo extends Model
{
    protected $fillable = ['title', 'description', 'completed','status','priority','due_date','user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
