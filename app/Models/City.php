<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'code_postal',
        'code_pays',
        'localite',
        'province',
        'region_postal',
        'status'
    ];
    public function shipmentProvider()
    {
        return $this->belongsTo(ShipmentProvider::class, 'LastMileHub');
    }

}