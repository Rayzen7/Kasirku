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
Route::get('/', function() {
    return Inertia::render('Auth/Login');
})->name('loginPage');

Route::middleware('auth')->group(function() {
    Route::post('/beranda', [AuthController::class, 'logout']);
    Route::get('/beranda', function() {
        return Inertia::render('Home');
    })->name('dashboardPage');
    
    Route::get('/transaksi', [ProductController::class, 'index']);
    Route::post('/transaksi/order', [TransactionController::class, 'store']);    
    
    Route::get('/riwayat', [TransactionController::class, 'index']);    

    Route::resource('/pengaturan', ProductController::class);
    Route::get('/pengaturan', [ProductController::class, 'indexSettings']);
    Route::post('/pengaturan/kategori', [CategoryController::class, 'categoryStore']);
    Route::put('/pengaturan/kategori/{id}', [CategoryController::class, 'categoryUpdate']);
    Route::delete('/pengaturan/kategori/{id}', [CategoryController::class, 'categoryDestroy']);
});