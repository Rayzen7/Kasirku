<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validateData->fails()) {
            return Inertia::render('Auth/Login', [
                'error' => 'Masukkan Input dengan Benar!'
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return Inertia::render('Auth/Login', [
                'error' => 'Email / Kata Sandi Salah!'
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();
        return Inertia::render('Auth/Login', [
            'success' => 'Masuk berhasil!',
            'redirect' => '/beranda'
        ]);
    }

    public function logout(Request $request) 
    {
        $user = Auth::user();
        if ($user) {
            $request->session()->invalidate();
            $request->session()->regenerate();
            Auth::logout();

            return Inertia::render('Home', [
                'success' => 'Keluar Berhasil',
                'redirect' => '/'
            ]);
        }        
    }
}
