<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
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
    
    Route::resource('/transaksi', CategoryController::class);
    // Route::resource('/')
    Route::get('/transaksi', function() {
        return Inertia::render('Transaction');
    });
});