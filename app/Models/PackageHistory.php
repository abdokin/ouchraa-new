<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'UpdatedBy',
        'PackageID',
        'TrackingNumber',
        'Reference',
        'ShippingFee',
        'ShipmentProviderID',
        'WorkflowID',
        'AmountToCollect',
        'DeliveryRun',
        'Attempts',
        'MasterBag',
        'LocationID',
        'ReasonID',
        'Scheduled',
        'ReturnID',
        'ActionID',
        'TransactionID',
        'StatusID',
        'DriverID'
    ];
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'UpdatedBy')->select('id','UserName');
    }
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
    public function driver()
    {
        return $this->belongsTo(User::class, 'DriverID')->select('id','UserName');
    }
    public function action()
    {
        return $this->belongsTo(Action::class, 'ActionID');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'StatusID');
    }
    public function workFlow()
    {
        return $this->belongsTo(WorkFlow::class, 'WorkflowID');
    }
    public function hub()
    {
        return $this->belongsTo(ShipmentProvider::class, 'ShipmentProviderID');
    }

}