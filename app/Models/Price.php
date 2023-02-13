<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;
    public function firstMile()
    {
        return $this->belongsTo(ShipmentProvider::class, 'FirstMileHub')->with('city');
    }
    public function lastMile()
    {
        return $this->belongsTo(City::class, 'CityID')->with('shipmentProvider');
    }
    public function city()
    {
        return $this->belongsTo(City::class, 'CityID');
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'CreatedBy');
    }
    public function updator()
    {
        return $this->belongsTo(User::class, 'UpdatedBy');
    }

}