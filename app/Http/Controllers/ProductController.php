<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = Category::all();
        $product = Product::with('category')->get();

        return Inertia::render('Transaction', [
            'category' => $category,
            'product' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg',
            'price' => 'required',
            'category_id' => 'exists:categories,id'
        ]);

        if ($validateData->fails()) {
            return Inertia::render('Transaction', [
                'error' => 'Kolom Harus Diisi!'
            ]);
        }

        if ($request->image) {
            $path = $request->file('image')->store('product', 'public');
        }

        Product::create([
            'name' => $request->name,
            'image' => $path,
            'price' => $request->price,
            'category_id' => $request->category_id
        ]);

        return Inertia::render('Transaction', [
            'success' => 'Data Berhasil Ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->find($id);
        if ($product) {
            return Inertia::render('Transaction', [
                'error' => 'Data Tidak Ditemukan'
            ]);
        }

        return Inertia::render('Transaction', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if ($product) {
            return Inertia::render('Transaction', [
                'error' => 'Data Tidak Ditemukan'
            ]);
        }

        if ($product->image) {
            if ($request->image) {
                Storage::disk('public')->delete($product->image);
            }

            $path = $request->file('image')->store('product', 'public');
            $product->image = $path;
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->save();

        return Inertia::render('Transaction', [
            'success' => "Data Berhasil Diubah"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            return Inertia::render('Transaction', [
                'error' => 'Data Tidak Ditemukan'
            ]);
        }
        
        $product->delete();
        return Inertia::render('Transaction', [
            'success' => "Data Berhasil Dihapus"
        ]);
    }
}
