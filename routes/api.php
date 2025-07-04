<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/riwayat/{id}', [TransactionController::class, 'show']);
Route::put('/riwayat/{id}', [TransactionController::class, 'update']);

Route::get('/pengaturan/menu/{id}', [ProductController::class, 'show']);
Route::put('/pengaturan/menu/{id}', [ProductController::class, 'update']);
Route::delete('/pengaturan/menu/{id}', [ProductController::class, 'destroy']);

Route::delete('/pengaturan/kategori/{id}', [CategoryController::class, 'categoryDestroy']);