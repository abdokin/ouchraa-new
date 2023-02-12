<?php

namespace App\Http\Controllers;

use App\Models\ShipmentProvider;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class HubController extends Controller
{
    public function index(Request $request)
    {
        $hubs = auth()->user()->shipmentProviderAccess();
        return inertia('SwitchHub',[
            'hubs'=>$hubs
        ]);
    }
    public function switchHub(ShipmentProvider $shipmentProvider)
    {
        // check if use has access to this shipment provider
        $user = User::find(auth()->id());
        // dd(json_decode($user->ShipmentProviderAccess));
        if(!in_array($shipmentProvider->id,json_decode($user->ShipmentProviderAccess))){
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);
        }
        // updated current hub in user
        $user->CurrentShipmentProvider = $shipmentProvider->id;
        $user->update();
        // return 
        return back()->with([
            'type' => 'success',
            'message' => 'Current Hub has been changed',
        ]);
    }
}
