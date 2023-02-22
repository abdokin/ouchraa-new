<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'UserName',
        // 'UserID'
        'name',
        'email',
        'address',
        'password',
        'google_id',
        'city_id',
        'phone',
        'address',
        'cin',
        'pickup_delivery_option',
        'revers_delivery_option'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'ShipmentProviderAccess' => 'array'

    ];
    public function Shippers()
    {
        if ($this->isEmployee()) {

            return Role::where('slug', 'shipper')->first()->users;
        }
        return null;

    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function shipmentProviderAccess()
    {
        return ShipmentProvider::whereIn('id', $this->ShipmentProviderAccess)->with('owner')->get();
    }
    public function currentShipmentProvider()
    {
        return $this->belongsTo(ShipmentProvider::class, 'CurrentShipmentProvider');
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }
    public function packagesTotal()
    {
        // RenderTemplate::render()
        return $this->hasMany(Package::class, 'ShipperID')->where('StatusID', 2);
    }
    public function packages()
    {
        // RenderTemplate::render()
        return $this->hasMany(Package::class, 'ShipperID');
    }
    public function packageTotalReadyToShip()
    {
        // RenderTemplate::render()
        return $this->packages()->where('StatusID', 2);
    }

    public function uploadHistory()
    {
        return $this->hasMany(UploadHistory::class, 'CreatedBy');
    }
    public function city()
    {
        return $this->belongsTo(City::class, 'ShipperCity')->with('shipmentProvider');
    }
    public function shippinOptions()
    {
        return $this->belongsToMany(ShippingOptions::class);
    }
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function shipmentProvider(): BelongsTo
    {
        return $this->belongsTo(ShipmentProvider::class, 'CurrentShipmentProvider');
    }
    public function accesses()
    {
        return $this->belongsToMany(Access::class);
    }
    public function workflow(): BelongsToMany
    {
        return $this->belongsToMany(WorkFlow::class)
            ->withPivot(['price']);
    }
    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'DriverID');
    }
    public function isEmployee()
    {
        $adminRole = Role::where('slug', 'own-team')->first();
        return $this->roles()->get()->contains($adminRole);
    }
    public function isShipper()
    {
        $shipperRole = Role::where('slug', 'shipper')->first();
        return $this->roles()->get()->contains($shipperRole);
    }
    public function isDriver()
    {
        $driverRole = Role::where('slug', 'driver')->first();
        return $this->roles()->get()->contains($driverRole);
    }
}