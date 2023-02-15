<?php

namespace Database\Seeders;

use App\Models\Access;
use App\Models\City;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $driver = User::factory(1)->create([
            'email' => 'driver@project.me',
            'password' => 'driver',
            'UserName' => 'Ouchraa driver',
            'ShipperCity' => City::first()->id,
        ])->first();
        $admin = User::factory(1)->create([
            'email' => 'admin@project.me',
            'password' => 'admin',
            'UserName' => 'Ouchraa Admin',
            'ShipperCity' => City::first()->id,
            'PickupDeliveryOption' => 1,
            'ReverseDeliveryPrice' => 1,
            'DriverID' => $driver->id,

            'CurrentShipmentProvider' => 1,
            'ShipmentProviderAccess' => [1,2]
        ])->first();
        $shipper = User::factory(1)->create([
            'email' => 'user@project.me',
            'password' => 'user',
            'DriverID' => $driver->id,
            'UserName' => 'Ouchraa demo',
            'ShipperCity' => City::first()->id,
        ])->first();
 
        $admin->roles()->attach(Role::where('slug', 'own-team')->first());
        $admin->accesses()->attach(Access::all());
        $shipper->roles()->attach(Role::where('slug', 'shipper')->first());
        // $admin->accesses()->attach(Access::whereIn();
        $shipper->accesses()->attach(Access::whereIn('id', [1, 2, 3, 5, 6])->get());

        $driver->roles()->attach(Role::where('slug', 'driver')->first());
    }
}