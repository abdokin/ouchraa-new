<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'LogFile',
        'TotalPackage',
        'PackageSuccess',
        'PackageFailure',
        'StatusID',
        'ShipmentProviderId',
        'UploadID',
        'CreatedBy',
        'Status'
    ];
  
    public function owner()
    {
        return $this->belongsTo(User::class, 'CreatedBy');
    }
    public function shipmentProvider()
    {
        return $this->belongsTo(ShipmentProvider::class, 'ShipmentProviderId');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'StatusID');
    }
    public function packges()
    {
        return $this->hasMany(Package::class, 'UploadID','UploadID');
    }
}
