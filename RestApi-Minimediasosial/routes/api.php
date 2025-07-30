<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsContoller;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\PostsController;
use App\Http\Middleware\JWTMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function(){

    //handel Auth
    Route::post('register', [AuthController::class , 'register']);
    Route::post('login', [AuthController::class, 'login']);

    //Menghandel posts
    Route::middleware(JWTMiddleware::class)->prefix('posts')->group(function(){
    Route::get('/', [PostsController::class, 'index']); //Menampilkan Semua data
    Route::post('/', [PostsController::class, 'store']); // Menyimpan data
    Route::get('{id}', [PostsController::class, 'show']); // Melihat data
    Route::put('{id}', [PostsController::class, 'update']); // Update Data
    Route::delete('{id}', [PostsController::class, 'destroy']); //Menghapus Data
    });

     Route::middleware(JWTMiddleware::class)->prefix('comments')->group(function(){
        Route::post('/', [CommentsContoller::class, 'store']);
        Route::delete('{id}', [CommentsContoller::class, 'destroy']);
    });

      Route::middleware(JWTMiddleware::class)->prefix('likes')->group(function(){
        Route::post('/', [LikesController::class, 'store']);
        Route::delete('{id}', [LikesController::class, 'destroy']);
    });

      Route::middleware(JWTMiddleware::class)->prefix('messages')->group(function(){
        Route::post('/', [MessagesController::class, 'store']);
        Route::get('{id}', [MessagesController::class, 'show']);
        Route::get('/getMessages/{user_id}', [MessagesController::class, 'getMessage']); // Lihat Pesan masuk berdasarkan User id
        Route::delete('{id}', [MessagesController::class, 'destroy']);
    });
});
