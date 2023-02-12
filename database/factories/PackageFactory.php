<?php

namespace Database\Factories;

use App\Models\Package;
use App\Models\Status;
use App\Models\WorkFlow;
use App\Models\Action;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'PackageID' => $this->faker->uuid(),
            // 'TrackingNumber'   => Package::generateTrackingNumber(),
            'Amount' => $this->faker->numberBetween(1, 200),
            'Weight' => $this->faker->numberBetween(1, 100),
            'ShippingFee' => $this->faker->numberBetween(1, 200),
            'ShippingMethod' => 1,
            'LocationID' => 1,
            'ShipmentProviderID' => 1,
            'StatusID' => Status::first(),
            'ActionID' => Action::first(),
            'WorkflowID' => WorkFlow::first(),
            'ProductDescription' => $this->faker->text(),
            'DeclaredValue' => $this->faker->numberBetween(1, 200),
            'DriverID' => 3,
            'CheckPackage' => $this->faker->boolean(),
            'ProofDistributedObject' => $this->faker->boolean(),
            'tracking_number_prefix' => $this->faker->text(12),
            'Fragile' => $this->faker->boolean(),
            'Reference' => $this->faker->text(10),
            'CustomerPhone' => $this->faker->phoneNumber(),
            'CustomerEmail' => $this->faker->email(),
            'CustomerName' => $this->faker->name(),
            'CustomerAddress' => $this->faker->address(),
            'CustomerCity' => 1,
            'ShipperPhone' => $this->faker->phoneNumber(),
            'ShipperEmail' => $this->faker->email(),
            'ShipperName' => $this->faker->name(),
            'ShipperAddress' => $this->faker->address(),
            'FistMileHub' => 1,
            'LastMileHub' => 1,
            'ShipperCity' => 1,
            'ShipperID' => 1,
            'ShipperCin' => $this->faker->text(6),
            'CustomerCin' => $this->faker->text(6),
            // 'currentShipmentProvider' => 1,
        ];
    }
}