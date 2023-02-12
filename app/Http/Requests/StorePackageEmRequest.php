<?php

namespace App\Http\Requests;

use App\Rules\UniqueReference;
use Illuminate\Foundation\Http\FormRequest;

class StorePackageEmRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !auth()->user()->isShipper();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
                'ShipperId' => ['required_without:ShipperCity','exists:users,id'],
                'ShipperName' =>['required_without:ShipperId'],
                'ShipperPhoneNumber' =>['required_without:ShipperId'],
                'ShipperAddress' =>['required_without:ShipperId'],
                'ShipperEmail' =>[''],
                'ShipperCin' =>[''],
                'ShipperCity' => ['exists:cities,id','required_without:ShipperId'],
                'RecipientName' =>['required'],
                'RecipientPhoneNumber' =>['required'],
                'RecipientAddress' =>['required'],
                'RecipientEmail' =>['email'],
                'Weight' => 'required|min:0|numeric',
                'DeclaredValue' => 'required|min:0|numeric', 
                'CheckPackage' => 'boolean|required',
                'ProofDistributedObject' => 'required|boolean',
                'tracking_number_prefix' => '',
                'Fragile' => 'required|boolean',
                'AmountToCollect' => 'required|min:0|numeric',
                'Reference' => ['required', new UniqueReference(auth()->user())], //TODO:check if is unique,new UniqueReference
                'RecipientCity' => 'required|exists:cities,id', 
                'ProductDescription' => '',
                'CustomerCin' => '',
                'ShippingMethod' => 'required|exists:work_flows,id',
        ];
    }
}
