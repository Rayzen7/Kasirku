<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_bodies', function (Blueprint $table) {
            $table->id();
            $table->uuid('transaction_header_id');
            $table->bigInteger('product_id')->unsigned();
            $table->string('quantity');
            $table->string('total');

            $table->foreign('transaction_header_id')->references('id')->on('transaction_headers')->onDelete('CASCADE');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_bodies');
    }
};
