<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function categoryStore(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validateData->fails()) {
            return Inertia::render('Settings', [
                'error' => 'Kolom Harus Diisi!',
                'redirect' => '/pengaturan'
            ]);
        }

        Category::create([
            'name' => $request->name
        ]);

        return Inertia::render('Settings', [
            'success' => "Data Berhasil Ditambahkan",
            'redirect' => '/pengaturan'
        ]);
    }

    public function categoryDestroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'message' => "Data Tidak Ditemukan!"
            ], 404);
        }

        $category->delete();
        return response()->json([
            'message' => "Data Berhasil Dihapus"
        ], 200);
    }
}
