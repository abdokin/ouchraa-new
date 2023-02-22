<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use PhpParser\Error;

class Package extends Model
{
    use HasFactory;
    protected $fillable = [
        'Amount',
        'AmountToCollect',
        'Weight',
        // 'ShippingFee',
        'TrackingNumber',
        'ProductDescription',
        'DeclaredValue',
        'DriverID',
        'CheckPackage',
        'ProofDistributedObject',
        'tracking_number_prefix',
        'Fragile',
        'Reference',
        'CustomerEmail',
        'CustomerPhone',
        'CustomerName',
        'CustomerAddress',
        'CustomerCity',
        'ShipperPhone',
        'ShipperEmail',
        'ShipperName',
        'ShipperAddress',
        'ShipperCity',
        'ShipperID',
        'StatusID',
        'ActionID',
        'WorkflowID',
        'ShipperCin',
        'CustomerCin',
        'PackageID',
        'FistMileHub',
        'TrackingNumber',
        'LastMileHub',
        'ShippingMethod',
        'ShipmentProviderID',
        'LocationID',
        'UploadID',
        'CreatedBy',
        'UpdatedBy'
    ];
    public function scopeFilterIndex($query, $filter)
    {

        // dd($filter);
        return $query->when($filter && isset($filter->status) && !empty($filter->status), function ($q) use ($filter) {
            return $q->whereIn('StatusID', $filter->status);

        })
            ->when($filter && isset($filter->workFlow) && !empty($filter->workFlow), function ($q) use ($filter) {
                return $q->whereIn('WorkflowID', $filter->workFlow);
            })
            ->when($filter && isset($filter->search) && !empty($filter->search), function ($q) use ($filter) {
                return $q->where('TrackingNumber', $filter->search)
                    ->orWhere('Reference', $filter->search);

            })
            ->when($filter && isset($filter->customerCity) && !empty($filter->customerCity), function ($q) use ($filter) {
                return $q->whereIn('CustomerCity', $filter->customerCity);

            })
            ->when($filter && isset($filter->firstMile) && !empty($filter->firstMile), function ($q) use ($filter) {
                return $q->whereIn('FistMileHub', $filter->firstMile);

            })
            ->when($filter && isset($filter->lastMile) && !empty($filter->lastMile), function ($q) use ($filter) {
                return $q->whereIn('LastMileHub', $filter->lastMile);

            })
            ->when($filter && isset($filter->created_in) && $filter->created_in->start && $filter->created_in->end, function ($q) use ($filter) {
                return $q->whereBetween('created_at', [Carbon::parse($filter->created_in->start), Carbon::parse($filter->created_in->end)]);

            })
            ->when($filter && isset($filter->updated_in) && $filter->updated_in->start && $filter->updated_in->end, function ($q) use ($filter) {
                return $q->whereBetween('updated_at', [Carbon::parse($filter->updated_in->start), Carbon::parse($filter->updated_in->end)]);

            });
    }
    public function scopeInHub($query, $hub)
    {
        return $query->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider);
    }

    public function scopeShipper($query)
    {
        if (auth()->user()->isEmployee()) {
            return $query;
        }
        return $query->where('ShipperID', auth()->id());
    }
    public function scopeInWorkFlow($query, $id)
    {
        return $query->where('WorkflowID', $id);
    }
    public function scopeReadyShip($query)
    {
        return $query
            ->where('StatusID', 2);
    }
    public function shippingMethod()
    {
        return $this->belongsTo(WorkFlow::class, 'ShippingMethod');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'UpdatedBy');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'CreatedBy');
    }
    public function History(): HasMany
    {
        return $this->hasMany(PackageHistory::class, 'PackageID')->with('updatedBy', 'action', 'status', 'workFlow', 'hub', 'driver');
    }
    public function FirstMile(): BelongsTo
    {
        return $this->belongsTo(ShipmentProvider::class, 'FistMileHub');
    }
    public function shipmentProvider(): BelongsTo
    {
        return $this->belongsTo(ShipmentProvider::class, 'ShipmentProviderID');
    }
    public function LastMile(): BelongsTo
    {
        return $this->belongsTo(ShipmentProvider::class, 'LastMileHub');
    }
    public function shipper(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ShipperID');
    }
    public function cutomerCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'CustomerCity')->with('shipmentProvider');
    }
    public function shipperCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'ShipperCity')->with('shipmentProvider');
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'DriverID');
    }
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'StatusID');
    }
    public function action(): BelongsTo
    {
        return $this->belongsTo(Action::class, 'ActionID');
    }
    public function workFlow(): BelongsTo
    {
        return $this->belongsTo(WorkFlow::class, 'WorkflowID');
    }
    public function reason(): BelongsTo
    {
        return $this->belongsTo(Reason::class, 'ReasonID');
    }
    public static function generateTrackingNumber(Package $package)
    {
        $user = User::find($package->CreatedBy);
        $prefix = $user->TrackingPrefix;
        $autoTn = $package->cutomerCity->shipmentProvider->AutoTN;
        if ($autoTn) {
            $prefix_ = $prefix ? $prefix : "MC";
            $tracking_number = null;
            do {
                $randomNumber = random_int(10000000, 99999999);
                $tracking_number = $prefix_ . $randomNumber;
            } while (!is_null(Package::where('FistMileHub', $user->CurrentShipmentProvider)->where('TrackingNumber', $tracking_number)->select('TrackingNumber')->first()));
            return $tracking_number;
        } else {
            $track = TPLTrackingNumber::where('ShipmentProvider', $package->ShipmentProviderID)->where('Status', false)->first();
            if (!$track) {
                throw new Error('Cant Get Tracking Number');
            }
            $track->Status = true;
            $track->PackageID = true;
            $track->update();
            return $track->TrackingNumber;
        }
    }
}