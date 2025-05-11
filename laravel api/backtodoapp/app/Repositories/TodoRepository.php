<?php

namespace App\Repositories;

use App\Models\Todo;

class TodoRepository
{
    protected $model;

    public function __construct(Todo $model)
    {
        $this->model = $model;
    }

    // Tüm kayıtları getir
    public function getAll()
    {
        return $this->model->all();
    }
    public function getTodosByUserId($userId)
    {
            \Log::info('getTodosByUserId çağrıldı', ['user_id' => $userId]);

        return $this->model->where('user_id', $userId)->get();
    }
    public function findById($id)
    {
        return $this->model->find($id);
    }

    // Yeni bir kayıt oluştur
    public function create(array $data)
    {
        return Todo::create([
            'title' =>$data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'priority' => $data['priority'],
            'due_date' => $data['due_date'],
            'user_id' => $data['user_id'],
        ]);
    }

    // Belirli bir kaydı güncelle
    public function update($id, array $data)
    {
        $todo = $this->findById($id);
        if ($todo) {
            $todo->update($data);
            return $todo;
        }
        return null;
    }

    // Belirli bir kaydı sil
    public function delete($id)
    {
        $todo = $this->findById($id);
        if ($todo) {
            $todo->delete();
            return true;
        }
        return false;
    }
}