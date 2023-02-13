<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCityRequest;
use App\Http\Requests\UpdateCityRequest;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{

    public function store(StoreCityRequest $req)
    {
        $attr = $req->toArray();
        // dd($attr);
        City::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'City has been created',
        ]);
    }
    public function delete(City $city)
    {
        // 
        $city->delete();
        return back()->with([
            'type' => 'success',
            'message' => 'City has been deleted',
        ]);
    }
    public function update(UpdateCityRequest $request, City $city)
    {

        $attr = $request->toArray();
        // dd($attr);
        $city->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'City has been updated',
        ]);
    }
    public function enableAll(Request $request)
    {
        // dd($request);
        $validate = $request->validate([
            'cities' => 'required|array',
            'value' => 'required|boolean'
        ]);
        // dd($validate);
        $cities = City::whereIn('id', $validate['cities'])->get();
        if (!$cities) {
            return back()->with([
                'type' => 'error',
                'message' => 'Error occured',
            ]);
        }
        foreach ($cities as $city) {
            if ($city) {
                $city->status = $validate['value'];
                $city->update();
            }
        }
        return back()->with([
            'type' => 'success',
            'message' => 'City has been ' . $validate['value'] ? 'Enabled' : 'Desable',
        ]);

    }
    public function enable(Request $request, City $city)
    {
        $validate = $request->validate([
            'enable' => 'required|boolean'
        ]);
        $city->status = $validate['enable'];
        $city->update();
        return back()->with([
            'type' => 'success',
            'message' => 'Hub has been Enable',
        ]);

    }
}