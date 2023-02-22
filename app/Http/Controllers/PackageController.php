<?php

namespace App\Http\Controllers;

use App\Exports\PackageExport;
use App\Helper\RenderTemplate;
use App\Http\Requests\StorePackageEmRequest;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageEmRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\City;
use App\Models\Package;
use App\Models\Role;
use App\Models\User;
use App\Models\WorkFlow;
use App\Rules\UniqueReference;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Excel;

// use Illuminate\Http\Request;

class PackageController extends Controller
{

    public function indexWithFilers(Request $request)
    {
        $data = json_decode($request->getContent());
        if (!$data->filter) {
            // 
        }
        $filter = $data->filter;
        $isEmployee = auth()->user()->isEmployee();
        $cities = City::where('status', true)->get();
        $shippers = auth()->user()->Shippers();
        $packages = Package::
            FilterIndex($filter)
            ->latest()
            ->InHub(auth()->user()->CurrentShipmentProvider)
            ->Shipper()
            ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
            ->paginate()
            ->appends(request()->query());
        $shippingMethods = WorkFlow::all();
        return inertia('Packages', [
            'packages' => $packages,
            'shippers' => $shippers,
            'cities' => $cities,
            'shippingMethods' => $shippingMethods,
            'isShipper' => !$isEmployee
        ]);
    }
    public function index()
    {
        $isEmployee = auth()->user()->isEmployee();
        $cities = City::where('status', true)->get();
        $shippers = auth()->user()->Shippers();
        $packages = Package::latest()
            ->InHub(auth()->user()->CurrentShipmentProvider)
            ->Shipper()
            ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
            ->paginate();

        $shippingMethods = WorkFlow::all();
        return inertia('Packages', [
            'packages' => $packages,
            'shippers' => $shippers,
            'cities' => $cities,
            'shippingMethods' => $shippingMethods,
            'isShipper' => !$isEmployee
        ]);
    }

    public function show(Package $package)
    {
        // return $package;
    }
    public function storeEm(StorePackageEmRequest $request)
    {
        if (auth()->user()->cannot('create', Package::class)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action  Not Authorized',
            ]);
        }
        $validated = $request->toArray();
        $loggedUser = auth()->user();
        $lastMileHub = City::find($validated['RecipientCity']);
        // dd($lastMileHub);
        if (!$lastMileHub->shipmentProvider) {
            throw ValidationException::withMessages([
                'RecipientCity' => 'This city not supported.',
            ]);
        }
        if (isset($validated['ShipperId'])) {

            $shipper = User::find($validated['ShipperId']);
            $rule = new UniqueReference($shipper);
            if (!$rule->passes("", $validated['Reference'])) {
                throw ValidationException::withMessages([
                    'Reference' => $rule->message()
                ]);
            }
            Package::create([
                'ShipperID' => $shipper->id,
                'Amount' => $validated['AmountToCollect'],
                'Weight' => $validated['Weight'],
                'CheckPackage' => $validated['CheckPackage'],
                'ProductDescription' => isset($validated['ProductDescription']) ? $validated['ProductDescription'] : null,
                'DeclaredValue' => $validated['DeclaredValue'],
                'DriverID' => $shipper->DriverID,
                'ProofDistributedObject' => $validated['ProofDistributedObject'],
                'AmountToCollect' => $validated['AmountToCollect'],
                'Fragile' => $validated['Fragile'],
                'Reference' => $validated['Reference'],
                'CustomerEmail' => isset($validated['RecipientEmail']) ? $validated['RecipientEmail'] : null,
                'CustomerPhone' => $validated['RecipientPhoneNumber'],
                'CustomerName' => $validated['RecipientName'],
                'CustomerAddress' => $validated['RecipientAddress'],
                'CustomerCity' => $validated['RecipientCity'],
                'ShipperPhone' => $shipper->ShipperPhone,
                'ShipperEmail' => $shipper->ShipperEmail,
                'ShipperName' => $shipper->UserName,
                'ShipperAddress' => $shipper->ShipperAddress,
                'ShipperCity' => $shipper->ShipperCity,
                'ShipperCin' => $shipper->cin,
                'ShipmentProviderID' => $shipper->CurrentShipmentProvider,
                'LocationID' => $shipper->ShipperCity,
                'CustomerCin' => isset($validated['CustomerCin']) ? $validated['CustomerCin'] : null,
                'ShippingMethod' => $validated['ShippingMethod'],
                'StatusID' => 1,
                'ActionID' => 7,
                'UpdatedBy' => auth()->id(),
                'CreatedBy' => auth()->id(),
                'WorkflowID' => $shipper->PickupDeliveryOption,
                'FistMileHub' => $shipper->CurrentShipmentProvider,
                'LastMileHub' => $lastMileHub->id,
            ]);
        } else {
            $rule = new UniqueReference(auth()->user());
            // dd('here',$rule);
            if (!$rule->passes("", $validated['Reference'])) {
                throw ValidationException::withMessages([
                    'Reference' => $rule->message()
                ]);
            }
            Package::create([
                // 'ShipperID' => $loggedUser->id,
                'Amount' => $validated['AmountToCollect'],
                'Weight' => $validated['Weight'],
                'CheckPackage' => $validated['CheckPackage'],
                'ProductDescription' => isset($validated['ProductDescription']) ? $validated['ProductDescription'] : null,
                'DeclaredValue' => $validated['DeclaredValue'],
                // 'DriverID' => $loggedUser->DriverID,
                'ProofDistributedObject' => $validated['ProofDistributedObject'],
                'AmountToCollect' => $validated['AmountToCollect'],
                'Fragile' => $validated['Fragile'],
                'Reference' => $validated['Reference'],
                'CustomerEmail' => isset($validated['RecipientEmail']) ? $validated['RecipientEmail'] : null,
                'CustomerPhone' => $validated['RecipientPhoneNumber'],
                'CustomerName' => $validated['RecipientName'],
                'CustomerAddress' => $validated['RecipientAddress'],
                'CustomerCity' => $validated['RecipientCity'],
                'ShipperPhone' => $validated['ShipperPhoneNumber'],
                'ShipperEmail' => $validated['ShipperEmail'],
                'ShipperName' => $validated['ShipperName'],
                'ShipperAddress' => $validated['ShipperAddress'],
                'ShipperCity' => $validated['ShipperCity'],
                'ShipperCin' => isset($validated['ShipperCin']) ? $validated['ShipperCin'] : null,
                'ShipmentProviderID' => $loggedUser->CurrentShipmentProvider,
                'LocationID' => $validated['ShipperCity'],
                'CustomerCin' => isset($validated['CustomerCin']) ? $validated['CustomerCin'] : null,
                'ShippingMethod' => $validated['ShippingMethod'],
                'StatusID' => 2,
                'ActionID' => 7,
                'WorkflowID' => 1,
                'UpdatedBy' => auth()->id(),
                'CreatedBy' => auth()->id(),
                'FistMileHub' => $loggedUser->CurrentShipmentProvider,
                'LastMileHub' => $lastMileHub->id,
            ]);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Package has been created',
        ]);
    }
    public function store(StorePackageRequest $request)
    {
        if (auth()->user()->cannot('create', Package::class)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action  Not Authorized',
            ]);
        }
        $validated = $request->toArray();
        $loggedUser = auth()->user();
        $lastMileHub = City::find($validated['RecipientCity']);
        if (!$lastMileHub->shipmentProvider) {
            throw ValidationException::withMessages([
                'RecipientCity' => 'This city not supported.',
            ]);
        }
        $package = Package::create([
            'ShipperID' => $loggedUser->id,
            'Amount' => $validated['AmountToCollect'],
            'Weight' => $validated['Weight'],
            'CheckPackage' => $validated['CheckPackage'],
            'ProductDescription' => isset($validated['ProductDescription']) ? $validated['ProductDescription'] : null,
            'DeclaredValue' => $validated['DeclaredValue'],
            'DriverID' => $loggedUser->DriverID,
            'ProofDistributedObject' => $validated['ProofDistributedObject'],
            'AmountToCollect' => $validated['AmountToCollect'],
            'Fragile' => $validated['Fragile'],
            'Reference' => $validated['Reference'],
            'CustomerEmail' => isset($validated['RecipientEmail']) ? $validated['RecipientEmail'] : null,
            'CustomerPhone' => $validated['RecipientPhoneNumber'],
            'CustomerName' => $validated['RecipientName'],
            'CustomerAddress' => $validated['RecipientAddress'],
            'CustomerCity' => $validated['RecipientCity'],
            'ShipperPhone' => $loggedUser->ShipperPhone,
            'ShipperEmail' => $loggedUser->ShipperEmail,
            'ShipperName' => $loggedUser->UserName,
            'ShipperAddress' => $loggedUser->ShipperAddress,
            'ShipperCity' => $loggedUser->ShipperCity,
            'ShipperCin' => $loggedUser->cin,
            'ShipmentProviderID' => $loggedUser->CurrentShipmentProvider,
            'LocationID' => $loggedUser->ShipperCity,
            'CustomerCin' => isset($validated['CustomerCin']) ? $validated['CustomerCin'] : null,
            'ShippingMethod' => $validated['ShippingMethod'],
            'StatusID' => 1,
            'ActionID' => 7,
            'UpdatedBy' => auth()->id(),
            'CreatedBy' => auth()->id(),
            'WorkflowID' => $loggedUser->PickupDeliveryOption,
            'FistMileHub' => $loggedUser->CurrentShipmentProvider,
            'LastMileHub' => $lastMileHub->id,
        ]);
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been created',
        ]);
    }

    public function update(UpdatePackageRequest $request, Package $package)
    {
        $attr = $request->toArray();
        $package->ActionID = 8;
        $package->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Package has been updated',
        ]);
    }
    public function updateByEm(UpdatePackageEmRequest $request, Package $package)
    {
        // dd($package);
        $attr = $request->toArray();
        // dd($attr);
        if (!isset($attr['ShipperId'])) {
            $package->ShipperName = $attr['ShipperName'];
            $package->ShipperPhone = $attr['ShipperPhoneNumber'];
            if (isset($attr['ShipperEmail'])) {

                $package->ShipperEmail = $attr['ShipperEmail'];
            }
            if (isset($attr['ShipperCin'])) {

                $package->ShipperCin = $attr['ShipperCin'];
            }
        } else {
            $shipper = User::find($attr['ShipperId']);
            $package->ShipperID = $shipper->id;
            $package->ShipperName = $shipper->UserName;
            $package->ShipperPhone = $shipper->ShipperPhone;
            if (isset($attr['ShipperEmail'])) {

                $package->ShipperEmail = $shipper->ShipperEmail;
            }
            if (isset($attr['ShipperCin'])) {

                $package->ShipperCin = $shipper->ShipperCin;
            }
        }
        $package->DeclaredValue = $attr['DeclaredValue'];
        $package->CheckPackage = $attr['CheckPackage'];
        $package->AmountToCollect = $attr['AmountToCollect'];
        $package->ProofDistributedObject = $attr['ProofDistributedObject'];
        $package->Fragile = $attr['Fragile'];
        $package->Reference = $attr['Reference'];
        if (isset($attr['CustomerEmail'])) {
            $package->CustomerEmail = $attr['CustomerEmail'];
        }
        if (isset($attr['CustomerCin'])) {
            $package->CustomerCin = $attr['CustomerCin'];
        }

        $package->ActionID = 8;
        $package->CustomerPhone = $attr['CustomerPhone'];
        $package->CustomerName = $attr['CustomerName'];
        $package->CustomerAddress = $attr['CustomerAddress'];
        $package->CustomerCity = $attr['CustomerCity'];
        $package->ShippingMethod = $attr['ShippingMethod'];
        $package->update();

        return back()->with([
            'type' => 'success',
            'message' => 'Package has been updated',
        ]);
    }
    public function readyToship(Package $package)
    {
        // dd($package);
        if (auth()->user()->cannot('readyToShip', $package)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);
        }
        $package->StatusID = 2;
        $package->ActionID = 8;
        $package->update();

        return back()->with([
            'type' => 'success',
            'message' => 'Package has been updated to ready to ship',
        ]);
    }
    public function readyToships(Request $request)
    {

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
                $package->StatusID = 2;
                $package->ActionID = 8;
                $package->update();
            }
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been updated to ready to ship',
        ]);
    }
    public function cancels(Request $request)
    {

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
            if ($request->user()->can('cancel', $package)) {
                $package->StatusID = 4;
                $package->ActionID = 8;
                $package->update();
            }
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been canceled',
        ]);
    }
    public function cancel(Package $package)
    {
        if (auth()->user()->cannot('cancel', $package)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);
        }
        $package->StatusID = 4;
        $package->ActionID = 8;
        $package->update();
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been canceled',
        ]);
    }


    public function exportLabel(Package $package)
    {
        // dd("here");
        if (auth()->user()->cannot('exportLabel', $package)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);

        }
        $code = auth()->user()->shipmentProvider->template->TemplateCode;
        $bladeView = Blade::compileString($code);
        $array = [
            'shipmentProviderOwner' => "Ouchraa",
            'link' => \Milon\Barcode\Facades\DNS1DFacade::getBarcodePNG('4', 'C39+'),
            'fastMileHub' => $package->FirstMile->ShipmentProviderName,
            'createdAt' => $package->created_at,
            'shipperName' => $package->ShipperName,
            'shipperPhone' => $package->ShipperPhone,
            'reference' => $package->Reference,
            'productDescription' => $package->ProductDescription,
            'checkPackage' => $package->CheckPackage,
            'trackingNumber' => $package->TrackingNumber,
            'lastMileHub' => $package->LastMile->ShipmentProviderName,
            'customerName' => $package->CustomerName,
            'customerAddress' => $package->CustomerAddress,
            'cutomerCity' => $package->cutomerCity->localite,
            'customerPhone' => $package->CustomerPhone,
            'amountToCollect' => $package->AmountToCollect,
        ];
        $content = RenderTemplate::render($bladeView, $array);
        $package->Printed = true;
        $package->update();
        $filename = 'Label-' . Str::random(20);
        Storage::disk('public')->put('labels/' . $filename . '.html', $content);
        $url = Storage::url("labels/" . $filename . '.html');
        return Inertia::location($url);

    }
    public function exportLabels(Request $request)
    {
        $data = json_decode($request->input('data'));
        $code = auth()->user()->shipmentProvider->template->TemplateCode;
        $bladeView = Blade::compileString($code);
        $packages = Package::whereIn('id', $data)->get();
        if (!$packages) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);
        }
        $content = '';
        foreach ($packages as $package) {
            if ($request->user()->can('exportLabel', $package)) {
                $array = [
                    'shipmentProviderOwner' => "Ouchraa",
                    'link' => \Milon\Barcode\Facades\DNS1DFacade::getBarcodePNG('4', 'C39+'),
                    'fastMileHub' => $package->FirstMile->ShipmentProviderName,
                    'createdAt' => $package->created_at,
                    'shipperName' => $package->ShipperName,
                    'shipperPhone' => $package->ShipperPhone,
                    'reference' => $package->Reference,
                    'productDescription' => $package->ProductDescription,
                    'checkPackage' => $package->CheckPackage,
                    'trackingNumber' => $package->TrackingNumber,
                    'lastMileHub' => $package->LastMile->ShipmentProviderName,
                    'customerName' => $package->CustomerName,
                    'customerAddress' => $package->CustomerAddress,
                    'cutomerCity' => $package->cutomerCity->localite,
                    'customerPhone' => $package->CustomerPhone,
                    'amountToCollect' => $package->AmountToCollect,
                ];
                $content2 = RenderTemplate::render($bladeView, $array);
                $content .= $content2;
                $package->Printed = true;
                $package->update();
            }
        }
        $filename = 'Label-' . Str::random(20);
        Storage::disk('public')->put('labels/' . $filename . '.html', $content);
        $url = Storage::url("labels/" . $filename . '.html');
        return Inertia::location($url);


    }
    public function export(Request $request)
    {
        $data = json_decode($request->getContent());
        $filters = $data->filter;
        $filename = 'EXPORT-' . Str::random(20);
        \Maatwebsite\Excel\Facades\Excel::store(new PackageExport(auth()->user()->isEmployee(), $filters, null), "exports/packages/" . $filename . '.csv', 'public', \Maatwebsite\Excel\Excel::CSV);
        $url = Storage::url("exports/packages/" . $filename . '.csv');
        return Inertia::location($url);
    }

}