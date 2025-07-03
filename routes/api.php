<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/riwayat/{id}', [TransactionController::class, 'show']);
Route::put('/riwayat/{id}', [TransactionController::class, 'update']);
