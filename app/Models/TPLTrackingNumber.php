<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TPLTrackingNumber extends Model
{
    use HasFactory;
    protected $fillable =[
        'TrackingNumber','ShipmentProvider','Status','PackageID'
    ];
}
