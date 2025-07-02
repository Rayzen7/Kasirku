<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function categoryStore(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validateData->fails()) {
            return Inertia::render('Transaction', [
                'error' => 'Kolom Harus Diisi!'
            ]);
        }

        Category::create([
            'name' => $request->name
        ]);

        return Inertia::render('Transaction', [
            'success' => "Data Berhasil Ditambahkan",
            'redirect' => '/transaksi'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function categoryUpdate(Request $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return Inertia::render('Transaction', [
                'error' => 'Data Tidak Ditemukan',
            ]);
        }

        $validateData = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validateData->fails()) {
            return Inertia::render('Transaction', [
                'error' => 'Kolom Harus Diisi!'
            ]);
        }

        $category->update([
            'name' => $request->name
        ]);

        return Inertia::render('Transaction', [
            'success' => 'Data Berhasil Diubah'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function categoryDestroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return Inertia::render('Transaction', [
                'error' => 'Data Tidak Ditemukan',
            ]);
        }

        $category->delete();
        return Inertia::render('Transaction', [
            'success' => 'Data Berhasil Dihapus'
        ]);
    }
}
