<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateHubRequest;
use App\Http\Requests\UpdateHubRequest;
use App\Models\ShipmentProvider;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HubController extends Controller
{
    public function index(Request $request)
    {
        $hubs = auth()->user()->shipmentProviderAccess();
        return inertia('SwitchHub', [
            'hubs' => $hubs,
        ]);
    }
    public function enableAll(Request $request)
    {
        // dd($request);
        $validate = $request->validate([
            'hubs' => 'required|array',
            'value' => 'required|boolean'
        ]);
        // dd($validate);
        $hubs = ShipmentProvider::whereIn('id', $validate['hubs'])->get();
        if (!$hubs) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occured',
            ]);
        }
        foreach ($hubs as $hub) {
            if ($hub) {
                $hub->Status = $validate['value'];
                $hub->update();
            }
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Hubs has been ' . $validate['value'] ? 'Enabled' : 'Desable',
        ]);

    }
    public function enable(Request $request, ShipmentProvider $shipmentProvider)
    {
        $validate = $request->validate([
            'enable' => 'required|boolean'
        ]);
        $shipmentProvider->Status = $validate['enable'];
        $shipmentProvider->update();
        return back()->with([
            'type' => 'success',
            'message' => 'Hub has been Enable',
        ]);

    }
    public function autoTn(Request $request, ShipmentProvider $shipmentProvider)
    {
        $validate = $request->validate([
            'enable' => 'required|boolean'
        ]);
        $shipmentProvider->AutoTN = $validate['enable'];
        $shipmentProvider->update();
        return back()->with([
            'type' => 'success',
            'message' => 'Hub has been updated',
        ]);

    }
    public function store(CreateHubRequest $request)
    {
        $attr = $request->toArray();
        // dd($attr);
        ShipmentProvider::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Hub has been created',
        ]);
    }
    public function update(UpdateHubRequest $request, ShipmentProvider $shipmentProvider)
    {

        $attr = $request->toArray();
        // dd($attr);
        $shipmentProvider->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Hub has been updated',
        ]);
    }
    public function switchHub(ShipmentProvider $shipmentProvider)
    {
        // check if use has access to this shipment provider
        $user = User::find(auth()->id());
        // dd(json_decode($user->ShipmentProviderAccess));
        if (!in_array($shipmentProvider->id, json_decode($user->ShipmentProviderAccess))) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);
        }
        // updated current hub in user
        $user->CurrentShipmentProvider = $shipmentProvider->id;
        $user->update();
        // return 
        return to_route('packages.index')->with([
            'type' => 'success',
            'message' => 'Current Hub has been changed',
        ]);
    }
}