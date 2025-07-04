<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::post('/', [AuthController::class, 'login']);
Route::get('/', [AuthController::class, 'showLogin'])->name('loginPage');

Route::middleware('auth')->group(function() {
    Route::post('/beranda', [AuthController::class, 'logout']);
    Route::get('/beranda', [AuthController::class, 'home'])->name('dashboardPage');
    
    Route::get('/transaksi', [ProductController::class, 'index']);
    Route::post('/transaksi/order', [TransactionController::class, 'store']);    
    
    Route::get('/riwayat', [TransactionController::class, 'index']);    

    Route::resource('/pengaturan', ProductController::class);
    Route::get('/pengaturan', [ProductController::class, 'indexSettings']);
    Route::post('/pengaturan/kategori', [CategoryController::class, 'categoryStore']);    
});