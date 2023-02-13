<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Price;
use App\Models\ShipmentProvider;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use PhpParser\Error;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ConfigurationController extends Controller
{
    public function index()
    {
        return inertia('Configuration/Index');
    }
    public function hubs()
    {
        // try {
        $hubs = QueryBuilder::for (ShipmentProvider::class)
            ->allowedFilters([
                AllowedFilter::exact('hubtype', 'hubtype.id'),
                AllowedFilter::exact('status', 'Status'),
                AllowedFilter::callback('created_in', function (Builder $query, $value) {
                    $query->whereBetween('created_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
                AllowedFilter::callback('updated_in', function (Builder $query, $value) {
                    $query->whereBetween('updated_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
            ])
            ->with('hubtype', 'owner')
            ->withCount('tplTracking')
            ->orderBy('id', 'DESC')
            ->get();
        return inertia('Configuration/Hubs', [
            'hubs' => $hubs
        ]);

    }
    public function cities()
    {
        // $cities = 
        $cities = QueryBuilder::for (City::class)
            ->allowedFilters([
                // AllowedFilter::exact('hubtype', 'hubtype.id'),
                AllowedFilter::exact('status', 'status'),
                AllowedFilter::callback('created_in', function (Builder $query, $value) {
                    $query->whereBetween('created_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
                AllowedFilter::callback('updated_in', function (Builder $query, $value) {
                    $query->whereBetween('updated_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
            ])
            ->with('shipmentProvider', 'creator', 'updater')
            // ->withCount('tplTracking')
            ->orderBy('id', 'DESC')
            ->get();
        return inertia('Configuration/Cities', [
            'cities' => $cities,

        ]);
    }
    public function prices()
    {
        $prices = QueryBuilder::for(Price::class)
            ->allowedFilters([
                // AllowedFilter::exact('hubtype', 'hubtype.id'),
                AllowedFilter::exact('status', 'status'),
                AllowedFilter::callback('created_in', function (Builder $query, $value) {
                    $query->whereBetween('created_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
                AllowedFilter::callback('updated_in', function (Builder $query, $value) {
                    $query->whereBetween('updated_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                }),
            ])
            ->with('firstMile','lastMile', 'updator')
            // ->withCount('tplTracking')
            ->orderBy('id', 'DESC')
            ->get();
        return inertia('Configuration/Prices',[
            'prices' => $prices
        ]);
    }
    public function sizes()
    {
        return inertia('Configuration/Sizes');
    }
}