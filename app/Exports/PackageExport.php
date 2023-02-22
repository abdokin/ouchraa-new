<?php

namespace App\Exports;

use App\Models\Package;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PackageExport implements FromQuery, WithHeadings, WithMapping, WithHeadingRow
{

    use Exportable;
    public $isEmployee;
    public $filters;
    public $workFlow;
    /**
     * @param boolean $isEmployee
     */
    public function __construct($isEmployee, $filters, $workFlow)
    {
        $this->isEmployee = $isEmployee;
        $this->filters = $filters;
        $this->workFlow = $workFlow;

    }
    public function map($package): array
    {
        return [
            $package->PackageID,
            $package->TrackingNumber,
            $package->Reference,
            $package->status->StatusName,
            $package->workFlow->WorkflowName,
            'Not Specified',
            $package->UploadID,
            $package->created_at,
            $package->createdBy->UserName ?? 'Not Specified',
            $package->updated_at,
            $package->updatedBy->UserName,
            $package->Scheduled ? 'TRUE' : "FALSE",
            $package->Weight,
            $package->ShippingFee,
            $package->DeclaredValue,
            $package->ProofDistributedObject ? 'TRUE' : "FALSE",
            $package->Fragile ? 'TRUE' : "FALSE",
            $package->CheckPackage ? 'TRUE' : "FALSE",
            'Not Specified',
            'Not Specified',
            $package->FirstMile->ShipmentProviderName,
            $package->shipmentProvider->ShipmentProviderName, //TODO Current
            $package->LastMile->ShipmentProviderName,
            $package->driver->UserName ?? 'Not Specified',
            $package->Attempts,
            'Not Specified', // Reasons,
            $package->Amount,
            $package->AmountToCollect,
            $package->ProductDescription,
            $package->ShipperID ?? "Not Specified",
            $package->ShipperName,
            $package->ShipperPhone,
            $package->ShipperAddress,
            $package->shipperCity->localite ?? 'Noy Specified',
            $package->CustomerPhone,
            $package->CustomerEmail ?? 'Not Specified',
            $package->CustomerName,
            'Not Specified',
            'Not Specified',
            $package->CustomerAddress,
            $package->cutomerCity->localite,
            'Not Specified', //delivery run,
            $package->shippingMethod->WorkflowName,
        ];
    }



    public function query()
    {
        $packages = Package::
            query()
            ->FilterIndex($this->filters)
            ->when(!is_null($this->workFlow), function ($q) {
                if ($this->workFlow == 1) {

                    return $q->where('WorkflowID', $this->workFlow)
                        ->whereIn('StatusID', [20, 21, 2]);
                } else {
                    return $q->where('WorkflowID', $this->workFlow)
                        ->whereIn('StatusID', [17, 3, 2]);
                }
            })
            ->where('ShipmentProviderID', auth()->user()->CurrentShipmentProvider)
            ->with('status', 'cutomerCity', 'shipperCity', 'updatedBy', 'createdBy', 'workFlow', 'FirstMile', 'LastMile', 'driver', 'History', 'shippingMethod')
            ->latest();
        return $packages;
    }
    public function headings(): array
    {
        return [
            'PACKAGE ID',
            'TRACKING NUMBER',
            'REFERENCE',
            'STATUS',
            'WORKFLOW',
            'TRANSACTION',
            'UPLOAD ID',
            'CREATED AT',
            'CREATED BY',
            'UPDATED AT',
            'UPDATED BY',
            'SCHEDULED',
            'WEIGHT',
            'SHIPPING FEE',
            'DECLARED VALUE',
            'PROOF DISTRIBUTE OBJECTS',
            'FRAGILE',
            'CHECK PACKAGE',
            'MASTER BAG',
            'LOCATION',
            'FIRST MILE HUB',
            'CURRENT SHIPMENT PROVIDER NAME',
            'LAST MILE HUB',
            'DRIVER',
            'ATTEMPTS',
            'REASON NAME',
            'AMOUNT',
            'AMOUNT TO COLLECT',
            'PRODUCT DESCRIPTION',
            'SHIPPER ID',
            'SHIPPER NAME',
            'SHIPPER PHONE',
            'SHIPPER ADDRESS',
            'SHIPPER CITY',
            'RECIPIENT PHONE',
            'RECIPIENT EMAIL',
            'RECIPIENT NAME',
            'LATITUDE',
            'LONGITUDE',
            'RECIPIENT ADDRESS',
            'RECIPIENT CITY',
            'DELIVERY RUN',
            'SHIPPING METHOD',
        ];
    }

}