<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\TransactionHeader;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

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

    public function home()
    {
        $product = Product::all();
        $transaction = TransactionHeader::where('status', '!=', 'canceled')->get();

        $productCount = $product->count();
        $transactionCount = $transaction->count();
        $transactionTotal = $transaction->sum('total_price');

        $transactionByYear = TransactionHeader::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_price) as total')
            ->where('status', '!=', 'canceled')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $yearlyData = [];

        foreach ($transactionByYear as $row) {
            $year = $row->year;
            $monthNumber = $row->month;
            $total = $row->total;

            $monthName = strtolower(date('F', mktime(0, 0, 0, $monthNumber, 1)));

            if (!isset($yearlyData[$year])) {
                $yearlyData[$year] = [
                    'january' => 0,
                    'february' => 0,
                    'march' => 0,
                    'april' => 0,
                    'may' => 0,
                    'june' => 0,
                    'july' => 0,
                    'august' => 0,
                    'september' => 0,
                    'october' => 0,
                    'november' => 0,
                    'december' => 0,
                ];
            }

            $yearlyData[$year][$monthName] = $total;
        }

        return Inertia::render('Home', [
            'product_count' => $productCount,
            'transaction_count' => $transactionCount,
            'transaction_total' => $transactionTotal,
            'transaction_yearly' => $yearlyData
        ]);
    }
}
