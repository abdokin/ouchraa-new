<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHubRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->isEmployee();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ShipmentProviderName' => ['required'],
            'ShipmentProviderAddress' => ['required'],
            'ShipmentProviderCity' => ['required', 'exists:cities,id'],
            'ShipmentProviderPhone' => ['required'],
            'Type' => ['required', 'exists:shipment_provider_types,id'],
            'TemplateID' => ['required', 'exists:templates,id'],
            'AutoTN' => 'boolean'
        ];
    }
}