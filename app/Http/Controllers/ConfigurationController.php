<?php

namespace App\Http\Controllers;

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
                    AllowedFilter::exact('status','Status'),
                    AllowedFilter::callback('created_in', function (Builder $query, $value) {
                        $query->whereBetween('created_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                    }),
                    AllowedFilter::callback('updated_in', function (Builder $query, $value) {
                        $query->whereBetween('updated_at', [Carbon::parse($value[0]), Carbon::parse($value[1])]);
                    }),
                ])
                ->with('hubtype', 'owner')
                ->orderBy('id', 'DESC')
                ->get();
            // $hubs = ShipmentProvider::latest()->orderBy('id', 'DESC')->with('type','owner')->get();
            return inertia('Configuration/Hubs', [
                'hubs' => $hubs
            ]);
        // } catch (\Throwable $th) {
        //     // throw new Error()

        //     return inertia('Configuration/Hubs', [
        //         'hubs' => []
        //     ]);
        // }

    }
    public function cities()
    {
        return inertia('Configuration/Cities');
    }
    public function prices()
    {
        return inertia('Configuration/Prices');
    }
    public function sizes()
    {
        return inertia('Configuration/Sizes');
    }
}