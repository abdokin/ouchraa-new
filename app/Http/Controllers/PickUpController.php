<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Package;
use App\Models\Reason;
use App\Models\Role;
use App\Models\User;
use App\Models\WorkFlow;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PickUpController extends Controller
{
    public function updateDriver(Request $req, User $user)
    {
        // TODO fix security


        $validated = $req->validate([
            'driver' => ['required', 'exists:users,id']
        ]);
        $user->DriverID = $validated['driver'];
        $user->update();
        return back()->with([
            'type' => 'success',
            'message' => 'shipper updated'
        ]);

    }
    public function packages()
    {
        $isEmployee = auth()->user()->isEmployee();
        if (!auth()->user()->isEmployee()) {
            return to_route('packages.index');
        }
        $packages = [];
        $reason = Reason::all()->filter(function ($value, $key) {
            $workflow = json_decode(data_get($value, 'Workflow'));
            // dd(json_decode($workflow));
            return in_array(2, $workflow);
        })->toArray();
        $cities = City::where('status', true)->get();
        $shippers = [];
        if ($isEmployee) {
            $shippers = Role::where('slug', 'shipper')->first()->users;

            $packages = Package::latest()
                ->where('StatusID', 2)->where('WorkflowID', 2)
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod', 'LastMile')
                ->paginate();
        } else {
            $packages = Package::latest()->where('StatusID', 2)
                ->where('WorkflowID', 2)
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->where('ShipperID', auth()->user()->id)
                ->latest()->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod', 'LastMile')
                ->paginate();

        }
        $shippingMethods = WorkFlow::all();
        return Inertia::render('PickUp/Packages', [

            'packages' => $packages,
            'shippers' => $shippers,
            'cities' => $cities,
            'shippingMethods' => $shippingMethods,
            'isShipper' => !$isEmployee,
            'reasons' => collect($reason)


        ]);
    }
    public function shippers()
    {
        $shippers = Role::where('slug', 'shipper')->first()->users()->paginate();
        $drivers = Role::where('slug', 'driver')->first()->users;
        if (!auth()->user()->isEmployee()) {
            return to_route('packages.index');
        }
        return Inertia::render('PickUp/Shippers', [
            'shippers' => $shippers,
            'drivers' => $drivers
        ]);
    }
    public function dropoff()
    {
        if (!auth()->user()->isEmployee()) {
            return to_route('packages.index');
        }
        $isEmployee = auth()->user()->isEmployee();
        $packages = [];
        $reason = Reason::all()->filter(function ($value, $key) {
            $workflow = json_decode(data_get($value, 'Workflow'));
            return in_array(2, $workflow);
        })->toArray();
        $cities = City::where('status', true)->get();
        $shippers = [];
        if ($isEmployee) {
            $shippers = Role::where('slug', 'shipper')->first()->users;

            $packages = Package::latest()->where('StatusID', 2)
                ->where('WorkflowID', 1)->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'LastMile', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod')
                ->paginate(auth()->user()->page_size);
        } else {
            $packages = Package::Latest()->where('StatusID', 2)->where('WorkflowID', 1)
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->where('ShipperID', auth()->user()->id)
                ->latest()->with('status', 'LastMile', 'customerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod')
                ->paginate(auth()->user()->page_size);

        }
        // dd($packages);
        $shippingMethods = WorkFlow::all();
        return Inertia::render('PickUp/DropOff', [
            'packages' => $packages,
            'shippers' => $shippers,
            'cities' => $cities,
            'shippingMethods' => $shippingMethods,
            'isShipper' => !$isEmployee,
            'reasons' => collect($reason)

        ]);
    }
    public function pickup(Package $package)
    {
        // pick up the packages
        // dd($package);
        $package->WorkflowID = $package->ShippingMethod;
        $package->StatusID = 6;
        // add location
        $package->update();

        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }

    public function notpickup(Request $request, Package $package)
    {
        $val = $request->validate([
            'reasonId' => 'required|exists:reasons,id'
        ]);
        // $package->WorkflowID = $package->ShippingMethod;
        $package->StatusID = 17;
        $package->ActionID = 8;
        $package->ReasonID = $val['reasonId'];
        // add location
        $package->update();
        return back()->with([
            'message' => 'Package Not Picked',
            'type' => 'success'
        ]);
    }

    public function notPickAll(Request $request)
    {

        $validated = $request->validate([
            'data' => 'required',
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occured'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {
                $package->WorkflowID = $package->ShippingMethod;
                $package->StatusID = 17;
                $package->ActionID = 8;
                $package->ReasonID = $validated['reasonId'];
                // add location
                $package->update();
            }
        }

        return back()->with([
            'message' => 'Package Not Accepted',
            'type' => 'success'
        ]);
    }

    public function dropped(Package $package)
    {
        // pick up the packages
        // dd($package);


        $package->WorkflowID = $package->ShippingMethod;
        $package->StatusID = 6;
        // add location
        $package->ActionID = 8;
        $package->update();

        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }

    public function droppedAll(Request $request)
    {
        // pick up the packages
        // dd($package);

        $validated = $request->validate([
            'data' => 'required',
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occured'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {
                $package->WorkflowID = $package->ShippingMethod;
                $package->StatusID = 6;
                $package->ActionID = 8;
                // add location
                $package->update();
            }
        }

        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }
    public function notAccepted(Request $request, Package $package)
    {
        $val = $request->validate([
            'reasonId' => 'required|exists:reasons,id'
        ]);
        // $package->WorkflowID = $package->ShippingMethod;
        $package->StatusID = 19;
        $package->ActionID = 8;
        $package->ReasonID = $val['reasonId'];
        // add location
        $package->update();
        return back()->with([
            'message' => 'Package Not Accepted',
            'type' => 'success'
        ]);
    }

    public function notAcceptedAll(Request $request)
    {

        $validated = $request->validate([
            'data' => 'required',
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occured'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {
                $package->WorkflowID = $package->ShippingMethod;
                $package->StatusID = 19;
                $package->ActionID = 8;
                $package->ReasonID = $validated['reasonId'];
                // add location
                $package->update();
            }
        }

        return back()->with([
            'message' => 'Package Not Accepted',
            'type' => 'success'
        ]);
    }
}