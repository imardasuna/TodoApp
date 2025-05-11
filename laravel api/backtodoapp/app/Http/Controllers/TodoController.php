<?php

namespace App\Http\Controllers;
use App\Services\TodoService;
use Illuminate\Http\Request;
use App\Http\Requests\AddTodoRequest;
use App\Http\Requests\ViewTodosRequest;

class TodoController extends Controller
{
    protected $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }
    public function index(ViewTodosRequest $request)
    {
        try {
        $userId = $request->header('User-Id');
        \Log::info('User-Id Header:', ['user_id' => $userId]); // User-Id header'ını logla

        $data = $request->all();
        if (!$userId) {
            return response()->json([
                'status' => false,
                'message' => 'User-Id header eksik.',
            ], 400);
        }
        $userId = intval($userId);
        $todos = $this->todoService->getTodosByUserId($userId);

        if ($todos->isEmpty()) {
            return response()->json([
                'status' => true,
                'todos' => [], 
                'message' => 'Hiçbir kayıt bulunamadı.',
            ]);
        }

        return response()->json([
            'status' => true,
            'todos' => $todos, 
        ]);
         } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
    }
    public function store(AddTodoRequest $request): JsonResponse
    {
        $data = $request->all();
        \Log::info('Request data:', $data); // Gelen veriyi logla

        $data['user_id'] = $request->user()->id;
        try {
            $todo = $this->todoService->createTodo($data);
            return response()->json([
                'message' => 'Todo başarıyla oluşturuldu.',
                'todo' => $todo,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Todo oluşturulamadı.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $data = $request->all();
            $todo = $this->todoService->updateTodo($id, $data);
            return response()->json([
                'status' => true,
                'message' => 'Todo başarıyla güncellendi.',
                'todo' => $todo,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }
    public function statuschange(Request $request, $id)
    {
    try {
        // Gelen veriyi al
        $status = $request->input('status');

        // Todo'yu güncelle
        $todo = $this->todoService->updateTodo($id, ['status' => $status]);

        return response()->json([
            'status' => true,
            'message' => 'Todo durumu başarıyla güncellendi.',
            'todo' => $todo,
        ]);
         } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage(),
        ], 404);
         }
    }
    public function delete($id)
    {
        try {
            $this->todoService->deleteTodo($id);
            return response()->json([
                'status' => true,
                'message' => 'Todo başarıyla silindi.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }
}
