<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;

Route::middleware('throttle:api')->group(function () {


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/login', [AuthController::class, 'login']);



Route::get('/todos/{id}', [TodoController::class, 'show']);
Route::post('/todos', [TodoController::class, 'store']);

Route::get('/todos', [TodoController::class, 'index']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::post('/todos/{id}/status', [TodoController::class, 'statuschange']);

Route::delete('/todos/{id}', [TodoController::class, 'delete']);
});


