<?php

namespace App\Observers;

use App\Models\Package;
use App\Models\PackageHistory;
use App\Models\Price;
use App\Models\Weight;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Hash;
use PhpParser\Error;

class PackageObserver
{

    public static function calculateShippingFee(Package $package)
    {
        // $user = auth()->user(); 1+1+20 +
        // whereRaw('WeightTo = (select max(`WeightTo`) from weights)')
        $user = User::find($package->ShipperID ?? -1);
        if (is_null($user)) {

            $user = User::find($package->CreatedBy);
        }
        // get the pick up method 
        $pickupprice = $user->PickupDeliveryPrice; // 1
        // weight
        $weight = 0;
        $weightControl = Weight::where('Status', true)->where('WeightFrom', '<=', $package->Weight)->where('WeightTo', '>=', $package->Weight)->first();
        if (is_null($weightControl)) {
            $weightControl = Weight::orderBy('WeightTo', 'desc')->first();
        }
        if ($weightControl) {
            if ($package->ShippingMethod == 3) {

                $weight = $weightControl->PickupStation;
            } else {
                $weight = $weightControl->DoorDelivery;
            }
        }
        //    price
        $price = 0;
        $priceEn = Price::where('FirstMileHub', $package->FistMileHub)->where('CityID', $package->CustomerCity)->first();

        // return $priceEn;
        if ($package->ShippingMethod == 3) {
            if (!$priceEn) {
                $price = Price::max('PickupStation');
            } else {

                $price = $priceEn->PickupStation;
            }
        } else {
            if (!$priceEn) {
                $price = Price::max('PickupStation');
            } else {
                $price = $priceEn->DoorDelivery;
            }
        }
        // get percent from user 
        $percent = $user->DeclaredValue; // 0
        $declaredValue = $percent * $package->DeclaredValue; // 0
        $package->perCoast = $declaredValue; // 0
        $package->ShippingFee = $pickupprice + $weight + $declaredValue + $price;
    }

    public function creating(Package $package)
    {

        if (is_null($package->UploadID)) {

            $package->TrackingNumber = Package::generateTrackingNumber($package);
        }
        $package->PackageID = Hash::make($package->TrackingNumber);
        PackageObserver::calculateShippingFee($package);
        // $package->update();
    }

    /**
     * Handle the Package "created" event.
     *
     * @param  \App\Models\Package  $package
     * @return void
     */
    public function created(Package $package)
    {
        $logged = User::find($package->CreatedBy);
        PackageHistory::create([
            'UpdatedBy' => $logged->id,
            'PackageID' => $package->id,
            'TrackingNumber' => $package->TrackingNumber,
            'Reference' => $package->Reference,
            'ShippingFee' => $package->ShippingFee,
            'ShipmentProviderID' => $package->ShipmentProviderID,
            'WorkflowID' => $package->WorkflowID,
            'AmountToCollect' => $package->AmountToCollect,
            'DeliveryRun' => $package->DeliveryRun,
            'Attempts' => $package->Attempts,
            'MasterBag' => $package->MasterBag,
            'LocationID' => $package->LocationID,
            'ReasonID' => $package->ReasonID,
            // 'Scheduled' => $package->Scheduled,
            'ReturnID' => $package->ReturnID,
            'ActionID' => $package->ActionID,
            'TransactionID' => $package->TransactionID,
            'StatusID' => $package->StatusID,
            'DriverID' => $package->DriverID
        ]);
    }
    public function updating(Package $package)
    {
        $logged = auth()->user();
        // throw new Error('cant');

        // PackageObserver::calculateShippingFee($package);
        $package->UpdatedBy = $logged->id;
    }

    /**
     * Handle the Package "updated" event.
     *
     * @param  \App\Models\Package  $package
     * @return void
     */
    public function updated(Package $package)
    {
        $logged = auth()->user();
        // me;
        // var_dump($package);
        // throw new Error('cant');
        $history = PackageHistory::create([
            'UpdatedBy' => $logged->id,
            'PackageID' => $package->id,
            'TrackingNumber' => $package->TrackingNumber,
            'Reference' => $package->Reference,
            'ShippingFee' => $package->ShippingFee,
            'ShipmentProviderID' => $package->ShipmentProviderID,
            'WorkflowID' => $package->WorkflowID,
            'AmountToCollect' => $package->AmountToCollect,
            'DeliveryRun' => $package->DeliveryRun,
            'Attempts' => $package->Attempts,
            'MasterBag' => $package->MasterBag,
            'LocationID' => $package->LocationID,
            'ReasonID' => $package->ReasonID,
            // 'Scheduled' => $package->Scheduled,
            'ReturnID' => $package->ReturnID,
            'ActionID' => $package->ActionID,
            'TransactionID' => $package->TransactionID,
            'StatusID' => $package->StatusID,
            'DriverID' => $package->DriverID ?? null,
        ]);
        if (!$history) {
            throw new \ErrorException("Cant create History");
        }
    }

    /**
     * Handle the Package "deleted" event.
     *
     * @param  \App\Models\Package  $package
     * @return void
     */
    public function deleted(Package $package)
    {
        $logged = auth()->user();
        PackageHistory::create([
            'UpdatedBy' => $logged->id,
            'PackageID' => $package->id,
            'TrackingNumber' => $package->TrackingNumber,
            'Reference' => $package->Reference,
            'ShippingFee' => $package->ShippingFee,
            'ShipmentProviderID' => $package->ShipmentProviderID,
            'WorkflowID' => $package->WorkflowID,
            'AmountToCollect' => $package->AmountToCollect,
            'DeliveryRun' => $package->DeliveryRun,
            'Attempts' => $package->Attempts,
            'MasterBag' => $package->MasterBag,
            'LocationID' => $package->LocationID,
            'ReasonID' => $package->ReasonID,
            'Scheduled' => $package->Scheduled,
            'ReturnID' => $package->ReturnID,
            'ActionID' => $package->ActionID,
            'TransactionID' => $package->TransactionID,
            'StatusID' => $package->StatusID,
            'DriverID' => $package->DriverID
        ]);
    }

    /**
     * Handle the Package "restored" event.
     *
     * @param  \App\Models\Package  $package
     * @return void
     */
    public function restored(Package $package)
    {
        $logged = auth()->user();
        PackageHistory::create([
            'UpdatedBy' => $logged->id,
            'PackageID' => $package->id,
            'TrackingNumber' => $package->TrackingNumber,
            'Reference' => $package->Reference,
            'ShippingFee' => $package->ShippingFee,
            'ShipmentProviderID' => $package->ShipmentProviderID,
            'WorkflowID' => $package->WorkflowID,
            'AmountToCollect' => $package->AmountToCollect,
            'DeliveryRun' => $package->DeliveryRun,
            'Attempts' => $package->Attempts,
            'MasterBag' => $package->MasterBag,
            'LocationID' => $package->LocationID,
            'ReasonID' => $package->ReasonID,
            'Scheduled' => $package->Scheduled,
            'ReturnID' => $package->ReturnID,
            'ActionID' => $package->ActionID,
            'TransactionID' => $package->TransactionID,
            'StatusID' => $package->StatusID,
            'DriverID' => $package->DriverID
        ]);
    }

    /**
     * Handle the Package "force deleted" event.
     *
     * @param  \App\Models\Package  $package
     * @return void
     */
    public function forceDeleted(Package $package)
    {
        //
    }
}