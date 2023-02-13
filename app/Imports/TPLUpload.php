<?php

namespace App\Imports;

use App\Models\ShipmentProvider;
use App\Models\TPLTrackingNumber;
use App\Rules\UniqueTplTracking;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TPLUpload implements ToModel, WithValidation, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $hub = ShipmentProvider::where('ShipmentProviderName', $row['hub'])->first()->id;
        // $rule = new UniqueTplTracking($hub);
        // if ($rule->passes("", $row['tracking_number'])) {
        //     throw ValidationException::withMessages([
        //         'tracking_number' => $rule->message(),
        //     ]);
        // }

        return new TPLTrackingNumber([
            'ShipmentProvider' => $hub,
            'TrackingNumber' => $row['tracking_number'],
        ]);
    }
    public function rules(): array
    {
        return [
            'hub' => ['required', 'exists:shipment_providers,ShipmentProviderName'],
            'tracking_number' => ['required'],
        ];
    }
}