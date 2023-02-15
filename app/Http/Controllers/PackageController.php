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
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

// use Illuminate\Http\Request;

class PackageController extends Controller
{

    public function indexWithFilers(Request $request)
    {
        $data = json_decode($request->getContent());
        // dd(json_decode($request->getContent())->filter);

        if (!$data->filter) {
            // 
        }
        $filter = $data->filter;
        // dd($data->filter && isset($filter->status) && !empty($filter->status));
        // dd($data->filter && isset($filter->workFlow) && !empty($filter->status));
        // dd($data->filter && isset($filter->customerCity)  && !empty($filter->customerCity));

        $isEmployee = auth()->user()->isEmployee();
        $packages = null;
        $cities = City::where('status', true)->get();
        // dd($data->filter && isset($filter->updated_in) && $filter->updated_in->start && $filter->updated_in->end);
        $shippers = [];
        if ($isEmployee) {
            $shippers = Role::where('slug', 'shipper')->first()->users;
            $packages = Package::
                when($data->filter && isset($filter->status) && !empty($filter->status), function ($q) use ($filter) {
                    return $q->whereIn('StatusID', $filter->status);

                })
                ->when($data->filter && isset($filter->workFlow) && !empty($filter->workFlow), function ($q) use ($filter) {
                    return $q->whereIn('WorkflowID', $filter->workFlow);

                })
                ->when($data->filter && isset($filter->customerCity) && !empty($filter->customerCity), function ($q) use ($filter) {
                    return $q->whereIn('CustomerCity', $filter->customerCity);

                })
                ->when($data->filter && isset($filter->firstMile) && !empty($filter->firstMile), function ($q) use ($filter) {
                    return $q->whereIn('FistMileHub', $filter->firstMile);

                })
                ->when($data->filter && isset($filter->lastMile) && !empty($filter->lastMile), function ($q) use ($filter) {
                    return $q->whereIn('LastMileHub', $filter->lastMile);

                })
                ->when($data->filter && isset($filter->created_in) && $filter->created_in->start && $filter->created_in->end, function ($q) use ($filter) {
                    return $q->whereBetween('created_at', [Carbon::parse($filter->created_in->start), Carbon::parse($filter->created_in->end)]);

                })
                ->when($data->filter && isset($filter->updated_in) && $filter->updated_in->start && $filter->updated_in->end, function ($q) use ($filter) {
                    return $q->whereBetween('updated_at', [Carbon::parse($filter->updated_in->start), Carbon::parse($filter->updated_in->end)]);

                })
                ->latest()
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
                ->paginate();

            //            $packages = Package::latest()->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)->->paginate(auth()->user()->page_size);
        } else {
            $packages = Package::
                when($data->filter && isset($filter->status) && !empty($filter->status), function ($q) use ($filter) {
                    return $q->whereIn('StatusID', $filter->status);

                })
                ->when($data->filter && isset($filter->workFlow) && !empty($filter->workFlow), function ($q) use ($filter) {
                    return $q->whereIn('WorkflowID', $filter->workFlow);

                })
                ->when($data->filter && isset($filter->customerCity) && !empty($filter->customerCity), function ($q) use ($filter) {
                    return $q->whereIn('CustomerCity', $filter->customerCity);

                })
                ->when($data->filter && isset($filter->firstMile) && !empty($filter->firstMile), function ($q) use ($filter) {
                    return $q->whereIn('FistMileHub', $filter->firstMile);

                })
                ->when($data->filter && isset($filter->lastMile) && !empty($filter->lastMile), function ($q) use ($filter) {
                    return $q->whereIn('LastMileHub', $filter->lastMile);

                })
                ->when($data->filter && isset($filter->created_in) && $filter->created_in->start && $filter->created_in->end, function ($q) use ($filter) {
                    return $q->whereBetween('created_at', [Carbon::parse($filter->created_in->start), Carbon::parse($filter->created_in->end)]);

                })
                ->when($data->filter && isset($filter->updated_in) && $filter->updated_in->start && $filter->updated_in->end, function ($q) use ($filter) {
                    return $q->whereBetween('updated_at', [Carbon::parse($filter->updated_in->start), Carbon::parse($filter->updated_in->end)]);

                })

                ->latest()
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
                ->paginate()
                ->appends(request()->query());
        }
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
        $packages = null;
        $cities = City::where('status', true)->get();
        $shippers = [];
        if ($isEmployee) {
            $shippers = Role::where('slug', 'shipper')->first()->users;
            $packages = Package::latest()
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
                ->paginate();

            //            $packages = Package::latest()->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)->->paginate(auth()->user()->page_size);
        } else {
            $packages = Package::latest()
                ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
                ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
                ->paginate();
        }
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
        return $package;
    }
    public function storeEm(StorePackageEmRequest $request)
    {
        // new UniqueReference(auth()->user())
        // dd('not implemented');
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

        // User::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
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
        // dd($lastMileHub);
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
        // User::create($attr);

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
        if (!isset($attr['ShipperId'])) {
            // $shipper = User::find($attr['ShipperId']);
            // $package->ShipperID = $attr['ShipperId'];
            $package->ShipperName = $attr['ShipperName'];
            $package->ShipperPhone = $attr['ShipperPhoneNumber'];
            if (isset($atrr['ShipperEmail'])) {

                $package->ShipperEmail = $attr['ShipperEmail'];
            }
            if (isset($attr['ShipperCin'])) {

                $package->ShipperCin = $attr['ShipperCin'];
            }
        } else {
            $shipper = User::find($attr['ShipperId']);
            $package->ShipperID = $shipper->ShipperId;
            $package->ShipperName = $shipper->ShipperName;
            $package->ShipperPhone = $shipper->ShipperPhone;
            if (isset($atrr['ShipperEmail'])) {

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
        // $package->ShipmentProviderID = $attr['ShipmentProviderID'];
        // $package->LocationID = $attr['LocationID'];
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
            // return $this->sendError('You cant change this package to be ready to ship ', 'You dont have access for this action');
        }
        $package->StatusID = 2;
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
                'message' => 'Error occured'

            ]);
        }
        foreach ($packages as $package) {
            if (auth()->user()->can('readyToShip', $package)) {
                $package->StatusID = 2;
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
                'message' => 'Error occured'

            ]);
        }
        foreach ($packages as $package) {
            if ($request->user()->can('cancel', $package)) {
                $package->StatusID = 4;
                $package->update();
            }
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been cancled',
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
        $package->update();
        return back()->with([
            'type' => 'success',
            'message' => 'Package has been cancled',
        ]);
    }
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }


    public function exportLabel(Package $package)
    {
        if (auth()->user()->cannot('exportLabel', $package)) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action Not Authorized',
            ]);

        }
        $code = auth()->user()->shipmentProvider->template->TemplateCode;
        $bladeView = Blade::compileString($code);
        $array = [
            'shipmentProviderOwner' => "Abdo KIng",
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
        // $random1 = Str::random(8);
        $filename = 'Label-' . Str::random(20);
        Storage::disk('public')->put('labels/' . $filename . '.html', $content);
        $url = Storage::url("labels/" . $filename . '.html');
        // dd($url);
        return Inertia::location($url);

    }
    public function exportLabels(Request $request)
    {
        $data = json_decode($request->input('data'));
        // dd($);
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
                    'shipmentProviderOwner' => "Abdo KIng",
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
        $filename = Str::random(20);
        Storage::disk('public')->put('labels/' . $filename . '.html', $content);
        $url = Storage::url("labels/" . $filename . '.html');
        return Inertia::location($url);


    }
    public function export(Request $request)
    {
        $filename = Str::random(20);
        \Maatwebsite\Excel\Facades\Excel::store(new PackageExport(auth()->user()->isEmployee()), "exports/packages/" . $filename . '.csv', 'public', \Maatwebsite\Excel\Excel::CSV);


        $url = Storage::url("exports/packages/" . $filename . '.csv');
        return Inertia::location($url);
    }

}