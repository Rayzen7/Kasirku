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
    public function index()
    {
        $category = Category::all();
        $product = Product::with('category')->get();

        return Inertia::render('Transaction', [
            'category' => $category,
            'product' => $product
        ]);
    }

    public function indexSettings()
    {
        $category = Category::all();
        $product = Product::with('category')->get();

        return Inertia::render('Settings', [
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
            return Inertia::render('Settings', [
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

        return Inertia::render('Settings', [
            'message' => 'Data Berhasil Ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json([
                'error' => 'Data Tidak Ditemukan!'
            ], 404);
        }

        return response()->json([
            'product' => $product
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Data Tidak Ditemukan!'
            ], 404);
        }

        $validateData = Validator::make($request->all(), [
            'name' =>'required',            
            'price' => 'required',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Kolom Harus Diisi!',
            ], 422);
        }

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $path = $request->file('image')->store('product', 'public');
            $product->image = $path;
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->save();

        return response()->json([
            'message' => 'Data Berhasil Diubah'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'error' => 'Data Tidak Ditemukan!'
            ], 404);
        }
        
        Storage::disk('public')->delete($product->image);
        $product->delete();
        return response()->json([
            'message' => 'Data Berhasil Dihapus'
        ], 200);
    }
}
