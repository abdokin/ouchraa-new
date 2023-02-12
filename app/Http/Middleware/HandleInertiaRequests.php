<?php

namespace App\Http\Middleware;

use App\Models\City;
use App\Models\ShipmentProvider;
use App\Models\Status;
use App\Models\User;
use App\Models\WorkFlow;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'master';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        // $user =User::find($request->user()->id)>with('currentShipmentProvider')
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'isEmployee' =>$request->user() ?  $request->user()->isEmployee() : null,
                'current_hub' => $request->user()->currentShipmentProvider ?? null,
            ],
            'statuses' => Status::all(),
            'cities' => City::all(),
            'hubs' => ShipmentProvider::all(),
            'workflows' => WorkFlow::all(),
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ]
        ]);
    }
}
