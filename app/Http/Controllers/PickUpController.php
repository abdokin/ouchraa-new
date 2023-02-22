<?php

namespace App\Http\Controllers;

use App\Exports\PackageExport;
use App\Models\City;
use App\Models\Package;
use App\Models\Reason;
use App\Models\Role;
use App\Models\User;
use App\Models\WorkFlow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
    public function packages(Request $request)
    {
        $data = json_decode($request->getContent());
        $filter = $data->filter ?? null;
        $isEmployee = auth()->user()->isEmployee();
        if (!auth()->user()->isEmployee()) {
            return to_route('packages.index');
        }
        $reason = Reason::all()->filter(function ($value, $key) {
            $workflow = json_decode(data_get($value, 'Workflow'));
            return in_array(2, $workflow);
        })->toArray();
        $cities = City::where('status', true)->get();
        $shippers = Role::where('slug', 'shipper')->first()->users;
        //TODO: fix shippers
        $packages = Package::FilterIndex($filter)
            ->InWorkFlow(2)
            ->whereIn('StatusID', [17, 3, 2])
            ->InHub(auth()->user()->CurrentShipmentProvider)
            ->Shipper()
            ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod', 'LastMile')
            ->latest()
            ->paginate();
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
    public function dropoff(Request $request)
    {
        $data = json_decode($request->getContent());
        $filter = $data->filter ?? null;
        if (!auth()->user()->isEmployee()) {
            return to_route('packages.index');
        }
        $isEmployee = auth()->user()->isEmployee();
        $reason = Reason::all()->filter(function ($value, $key) {
            $workflow = json_decode(data_get($value, 'Workflow'));
            return in_array(1, $workflow);
        })->toArray();
        $packages = Package::FilterIndex($filter)
            ->InWorkFlow(1)
            ->whereIn('StatusID', [20, 21, 2])
            ->InHub(auth()->user()->CurrentShipmentProvider)
            ->Shipper()
            ->with('status', 'LastMile', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'driver', 'History', 'shippingMethod')
            ->latest()
            ->paginate();
        // dd($filter);

        return Inertia::render('PickUp/DropOff', [
            'packages' => $packages,
            'isShipper' => !$isEmployee,
            'reasons' => collect($reason)
        ]);
    }
    public function pickup(Package $package)
    {
        // TODO : add permission

        $package->StatusID = 3;
        $package->update();
        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }

    public function notpickup(Request $request, Package $package)
    {
        // TODO : add permission
        $val = $request->validate([
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $package->StatusID = 17;
        $package->ActionID = 8;
        $package->ReasonID = $val['reasonId'];
        $package->update();
        return back()->with([
            'message' => 'Package Not Picked',
            'type' => 'success'
        ]);
    }

    public function notPickAll(Request $request)
    {
        // TODO : add permission

        $validated = $request->validate([
            'data' => 'required',
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occurred'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {

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

        // TODO : add permission

        $package->StatusID = 20;
        $package->ActionID = 8;
        $package->update();

        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }
    public function pickedAll(Request $request)
    {
        // TODO : add permission

        $validated = $request->validate([
            'data' => 'required',
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occurred'

            ]);
        }
        foreach ($packages as $package) {
            // if (auth()->user()->can('readyToShip', $package)) {

            $package->StatusID = 3;
            $package->ActionID = 8;
            // add location
            $package->update();
            // }
        }

        return back()->with([
            'message' => 'Package Picked',
            'type' => 'success'
        ]);
    }
    public function droppedAll(Request $request)
    {
        // TODO : add permission

        $validated = $request->validate([
            'data' => 'required',
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occurred'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {

                $package->StatusID = 20;
                $package->ActionID = 8;
                // add location
                $package->update();
            }
        }

        return back()->with([
            'message' => 'Package Recieved',
            'type' => 'success'
        ]);
    }
    public function notAccepted(Request $request, Package $package)
    {
        // TODO : add permission

        $val = $request->validate([
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $package->StatusID = 21;
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
        // TODO : add permission

        $validated = $request->validate([
            'data' => 'required',
            'reasonId' => 'required|exists:reasons,id'
        ]);
        $packages = Package::whereIn('id', $validated['data'])->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occurred'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {

                $package->StatusID = 21;
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
    public function exportDropOff(Request $request)
    {
        // TODO : add permission

        $data = json_decode($request->getContent());
        $filters = $data->filter;
        // dd($filters);
        $filename = 'EXPORT-' . Str::random(20);
        \Maatwebsite\Excel\Facades\Excel::store(new PackageExport(auth()->user()->isEmployee(), $filters, 1), "exports/packages/" . $filename . '.csv', 'public', \Maatwebsite\Excel\Excel::CSV);
        $url = Storage::url("exports/packages/" . $filename . '.csv');
        return Inertia::location($url);

    }

    public function exportDelivery(Request $request)
    {
        // TODO : add permission

        $data = json_decode($request->getContent());
        $filters = $data->filter;
        $filename = 'EXPORT-' . Str::random(20);
        \Maatwebsite\Excel\Facades\Excel::store(new PackageExport(auth()->user()->isEmployee(), $filters, 2), "exports/packages/" . $filename . '.csv', 'public', \Maatwebsite\Excel\Excel::CSV);
        $url = Storage::url("exports/packages/" . $filename . '.csv');
        return Inertia::location($url);

    }


}