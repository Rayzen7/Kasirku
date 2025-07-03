<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TransactionHeader extends Model
{
    use HasFactory, Notifiable, HasUuids;
    protected $table = 'transaction_headers';
    protected $fillable = [
        'status',
        'total_price'
    ];

    /**
     * Get all of the comments for the TransactionHeader
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactionBody()
    {
        return $this->hasMany(TransactionBody::class, 'transaction_header_id');
    }
}
