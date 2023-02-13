<?php

namespace App\Observers;

use App\Models\ShipmentProvider;

class HubObserver
{
    public function creating(ShipmentProvider $shipmentProvider)
    {
        $shipmentProvider->CreatedBy = auth()->id();
    }
    /**
     * Handle the ShipmentProvider "created" event.
     *
     * @param  \App\Models\ShipmentProvider  $shipmentProvider
     * @return void
     */
    public function created(ShipmentProvider $shipmentProvider)
    {
        //
    }

    /**
     * Handle the ShipmentProvider "updated" event.
     *
     * @param  \App\Models\ShipmentProvider  $shipmentProvider
     * @return void
     */
    public function updated(ShipmentProvider $shipmentProvider)
    {
        //
    }

    /**
     * Handle the ShipmentProvider "deleted" event.
     *
     * @param  \App\Models\ShipmentProvider  $shipmentProvider
     * @return void
     */
    public function deleted(ShipmentProvider $shipmentProvider)
    {
        //
    }

    /**
     * Handle the ShipmentProvider "restored" event.
     *
     * @param  \App\Models\ShipmentProvider  $shipmentProvider
     * @return void
     */
    public function restored(ShipmentProvider $shipmentProvider)
    {
        //
    }

    /**
     * Handle the ShipmentProvider "force deleted" event.
     *
     * @param  \App\Models\ShipmentProvider  $shipmentProvider
     * @return void
     */
    public function forceDeleted(ShipmentProvider $shipmentProvider)
    {
        //
    }
}
