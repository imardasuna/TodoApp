<?php

namespace App\Services;

use App\Repositories\TodoRepository;

class TodoService
{
    protected $todoRepo;

    public function __construct(TodoRepository $todoRepo)
    {
        $this->todoRepo = $todoRepo;
    }
    
    public function getAllTodos()
    {
        return $this->todoRepo->getAll();
    }
    public function getTodosByUserId($userId)
    {
        return $this->todoRepo->getTodosByUserId($userId);
    }
    public function getTodoById($id)
    {
        $todo = $this->todoRepo->findById($id);
        if (!$todo) {
            throw new \Exception('Todo not found');
        }
        return $todo;
    }

    // Yeni bir kayıt oluştur
    public function createTodo(array $data)
    {
        return $this->todoRepo->create($data);
    }

    // Belirli bir kaydı güncelle
    public function updateTodo($id, array $data)
    {
        $todo = $this->todoRepo->update($id, $data);
        if (!$todo) {
            throw new \Exception('Todo not found');
        }
        return $todo;
    }

    // Belirli bir kaydı sil
    public function deleteTodo($id)
    {
        $deleted = $this->todoRepo->delete($id);
        if (!$deleted) {
            throw new \Exception('Todo not found');
        }
        return true;
    }
}