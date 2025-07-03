<?php

namespace App\Http\Controllers;

use App\Models\TransactionBody;
use App\Models\TransactionHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactionHeader = TransactionHeader::with('transactionBody')->get();
        return Inertia::render('', [
            'transaction' => $transactionHeader
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $transactionHeader = TransactionHeader::create([
            'total_price' => $request->total_price,
            'status' => 'success'
        ]);

        foreach ($request->items as $item) {
            TransactionBody::create([
                'transaction_header_id' => $transactionHeader->id,
                'product_id' => $item["productId"],
                'quantity' => $item["quantity"],
                'total' => $item["totalPrice"],
            ]);
        }

        return Inertia::render('Transaction', [
            'message' => 'Transaksi Berhasil!',
            'redirect' => '/transaksi'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
