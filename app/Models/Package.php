<?php

namespace App\Models;

use App\Rules\UniqueTrackingNumber;
use Database\Seeders\PlTrackingNumberSeeder;
use Illuminate\Contracts\Database\Eloquent\Builder;
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
    public function customerCity(): BelongsTo
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
        // TODO get the configuration from table
        $user = User::find($package->CreatedBy);
        $unique = new UniqueTrackingNumber($user);
        $prefix = $user->TrackingPrefix;
        $autoTn = $package->customerCity->shipmentProvider->AutoTN;
        if ($autoTn) {
            $prefix_ = $prefix ? $prefix : "MC";
            $tracking_numer = null;
            do {
                $randomNumber = random_int(10000000, 99999999);
                $tracking_numer = $prefix_ . $randomNumber;
            } while (!is_null(Package::where('FistMileHub', $user->CurrentShipmentProvider)->where('TrackingNumber', $tracking_numer)->select('TrackingNumber')->first()));

            // } while ($unique->passes('',$tracking_numer));
            return $tracking_numer;
        } else {
            $track = TPLTrackingNumber::where('Status', false)->first();
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