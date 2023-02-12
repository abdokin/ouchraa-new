<?php

namespace App\Imports;

use App\Models\Action;
use App\Models\City;
use App\Models\Package;
use App\Models\ShipmentProvider;
use App\Models\Status;
use App\Models\UploadHistory;
use App\Models\WorkFlow;
use App\Rules\UniqueReference;
use App\Rules\UniqueTrackingNumber;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Auth\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Events\ImportFailed;


class PackageImport implements ToModel, WithValidation, WithHeadingRow
{
    public $uploadHistory;
    public $user;
    public function __construct(UploadHistory $uploadHistory)
    {
        $this->uploadHistory = $uploadHistory;
        $this->user = $uploadHistory->owner;
    }
    public function rules(): array
    {
        return [
            'shipper_name' => ['required'],
            'tracking_number' => ['required',new UniqueTrackingNumber($this->user)],
            'reference' => ['required', new UniqueReference($this->user)],
            'customer_name' => ['required'],
            'customer_phone' => ['required'],
            'customer_email' => ['required'],
            'customer_address' => ['required'],
            'customer_city' => ['required', 'exists:cities,localite'],
            'latitude' => [''],
            'longitude' => [''],
            'shipping_method' => ['required', 'exists:work_flows,WorkflowName'],
            'amount_to_collect' => ['required','numeric','min:0'],
            'weight' => ['required','numeric','min:0'],
            'declared_value' => ['required','numeric','min:0'],
            'fragile' => ['required','boolean'],
            'proof_distributed_object' => ['required','boolean'],
            'product_description' => ['required'],
            'check_package' => ['required','boolean'],
            // 'Shipping_Method' => ['required','exists:work_flows,WorkflowName']
        ];

    }
    public function model(array $row)
    {
        $loggedUser = $this->user;
        $lastMile = City::where('localite', $row['customer_city'])->first()->shipmentProvider->id;
        $this->uploadHistory->PackageSuccess += 1;
        $this->uploadHistory->update();
        return new Package([
            'Amount' => $row['amount_to_collect'],
            'Weight' => $row['weight'],
            'AmountToCollect' => $row['amount_to_collect'],
            'DeclaredValue' => $row['declared_value'],
            'ProductDescription' => $row['product_description'],
            'Reference' => $row['reference'],
            'ProofDistributedObject' => $row['proof_distributed_object'],
            'Fragile' => $row['fragile'],
            'TrackingNumber' => isset($row['tracking_number']) ? $row['tracking_number'] : null,
            'CheckPackage' => $row['check_package'],
            'CustomerName' => $row['customer_name'],
            'CustomerEmail' => $row['customer_email'],
            'CustomerPhone' => $row['customer_phone'],
            'CustomerAddress' => $row['customer_address'],
            // 'CustomerCin' => $row['customercin'],
            'CustomerCity' => City::where('localite', $row['customer_city'])->first()->id,
            'ShipperName' => $loggedUser->UserName,
            'ShipperEmail' => $loggedUser->email,
            'ShipperPhone' => $loggedUser->ShipperPhone,
            'ShipperAddress' => $loggedUser->ShipperAddress,
            'ShipperCin' => $loggedUser->ShipperCin,
            'ShipperCity' => $loggedUser->ShipperCity,
            'ShipperID' => $loggedUser->id,
            'ShippingMethod' => WorkFlow::where('WorkflowName', $row['shipping_method'])->first()->id,
            'StatusID' => 1,
            'UpdatedBy' => $loggedUser->id,
            'CreatedBy' => $loggedUser->id,
            'WorkflowID' => $loggedUser->PickupDeliveryOption,
            'ActionID' => Action::first()->id,
            'UploadID' => $this->uploadHistory->UploadID,
            'FistMileHub' => $loggedUser->CurrentShipmentProvider,
            'LastMileHub' => $lastMile,
            'ShipmentProviderID' => $loggedUser->CurrentShipmentProvider,
            'LocationID' => $loggedUser->ShipperCity,

        ]);
    }
}