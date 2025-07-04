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
        $transactionHeader = TransactionHeader::with('transactionBody')->orderBy('created_at', 'DESC')->get();
        return Inertia::render('History', [
            'transaction' => $transactionHeader->map(function($item) {
                return [
                    'id' => $item->id,
                    'total_price' => $item->total_price,
                    'status' => $item->status,
                    'created_at' => $item->created_at,
                    'transaction_body' => $item->transactionBody->map(function($data) {
                        return [
                            'id' => $data->id,
                            'product' => $data->product,
                            'quantity' => $data->quantity,
                            'total' => $data->total
                        ];
                    })
                ];
            }),
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
        $transactionHeader = TransactionHeader::with('transactionBody')->find($id);
        if (!$transactionHeader) {
            return response()->json([
                'message' => 'Data Tidak Ditemukan'
            ], 404);
        }

        return response()->json([
            'transaction' => [
                'id' => $transactionHeader->id,
                'total_price' => $transactionHeader->total_price,
                'status' => $transactionHeader->status,
                'created_at' => $transactionHeader->created_at,
                'transaction_body' => $transactionHeader->transactionBody->map(function($data) {
                    return [
                        'id' => $data->id,
                        'product' => $data->product,
                        'quantity' => $data->quantity,
                        'total' => $data->total
                    ];
                })
            ]
        ], 200);
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
        $transactionHeader = TransactionHeader::with('transactionBody')->find($id);
        if (!$transactionHeader) {
            return response()->json([
                'message' => 'Data Tidak Ditemukan'
            ], 404);
        }

        $transactionHeader->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Data Berhasil Diubah!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
