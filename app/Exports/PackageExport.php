<?php

namespace App\Exports;

use App\Models\Package;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PackageExport implements FromQuery, WithHeadings, WithMapping
{
   
    use Exportable;
    public function map($package): array
    {
        return [
            $package->PackageID,
            $package->TrackingNumber,
            $package->Reference,
            $package->status->StatusName,
            $package->workFlow->WorkflowName,
            null,
            $package->UploadID,
            $package->created_at,
            $package->createdBy->UserName ?? null,
            $package->updated_at,
            $package->updatedBy->UserName,
            $package->Scheduled ? 'TRUE' : "FALSE",
            $package->Weight,
            $package->ShippingFee,
            $package->DeclaredValue ? 'TRUE' : "FALSE",
            $package->ProofDistributedObject ? 'TRUE' : "FALSE",
            $package->Fragile ? 'TRUE' : "FALSE",
            $package->CheckPackage ? 'TRUE' : "FALSE",
            null,
            null,
            $package->FirstMile->ShipmentProviderName,
            $package->shipmentProvider->ShipmentProviderName, //TODO Current
            $package->LastMile->ShipmentProviderName,
            $package->driver->UserName ?? null,
            $package->Attempts,
            null, // Reasons,
            $package->Amount,
            $package->AmountToCollect,
            $package->ProductDescription,
            $package->ShipperID,
            $package->ShipperName,
            $package->ShipperPhone,
            $package->ShipperAddress,
            $package->shipperCity->localite,
            $package->CustomerPhone,
            $package->CustomerEmail,
            $package->CustomerName,
            $package->Latitude,
            $package->Longitude,
            $package->CustomerAddress,
            $package->customerCity->localite,
            null,//delivery run,
            $package->shippingMethod->WorkflowName,
        ];
    }

    // public function fields(): array
    // {
    //     return [
    //         'id',
    //         'description',
    //         'amount',
    //         'user',
    //         'created_at'
    //     ];
    // }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function query()
    {
        return Package::with('createdBy','updatedBy','status','driver','lastMile','FirstMile')->get();
    }
    public function headings(): array
    {
        return [
            'PACKAGE ID','TRACKING NUMBER','REFERENCE','STATUS','WORKFLOW','TRANSACTION','UPLOAD ID','CREATED AT','CREATED BY','UPDATED AT','UPDATED BY','SCHEDULED','WEIGHT','SHIPPING FEE','DECLARED VALUE','PROOF DISTRIBUTE DOBJECT','FRAGILE','CHECK PACKAGE','MASTER BAG','LOCATION','FIRST MILE HUB','CURRENT SHIPMENT PROVIDER NAME','LAST MILE HUB','DRIVER','ATTEMPTS','REASON NAME','AMOUNT','AMOUNT TO COLLECT','PRODUCT DESCRIPTION','SHIPPER ID','SHIPPER NAME','SHIPPER PHONE','SHIPPER ADDRESS','SHIPPER CITY','RECIPIENT PHONE','RECIPIENT EMAIL','RECIPIENT NAME','LATITUDE','LONGITUDE','RECIPIENT ADDRESS','RECIPIENT CITY','DELIVERY RUN','SHIPPING METHOD',
        ];
    }

    /**
     */
  
}