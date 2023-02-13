<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCityRequest extends FormRequest
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
            'code_postal' => ['required'],
            'code_pays' => ['required'],
            'localite' => ['required'],
            'province' => ['required'],
            'region_postal' => ['required'],
            'LastMileHub' => ['required', 'exists:shipment_providers,id']
        ];
    }
}