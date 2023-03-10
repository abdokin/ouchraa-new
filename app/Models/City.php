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
        'LastMileHub',
        'status'
    ];
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }
    public function updater()
    {
        return $this->belongsTo(User::class, 'updatedBy');
    }
    public function shipmentProvider()
    {
        return $this->belongsTo(ShipmentProvider::class, 'LastMileHub')->with('hubtype','city');
    }

}