<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TransactionBody extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'transaction_bodies';
    protected $fillable = [
        'transaction_header_id',
        'product_id',
        'quantity',
        'total'
    ];

    /**
     * Get the user that owns the TransactionBody
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
