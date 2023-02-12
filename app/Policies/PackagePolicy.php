<?php

namespace App\Policies;

use App\Models\Package;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PackagePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {

        if ($user->accesses->contains('id', 8)) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Package $package)
    {
        if ($user->accesses->contains('id', 7)) {
            return true;
        }
        return $user->id = $package->ShipperID;

    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->accesses->contains('id', 3)) {
            return true;
        }
        return false;
        // return $user->id = $package->ShipperID ;

        // return $user->accesses->contains('id', "Package Creation");
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Package $package)
    {
        if ($user->accesses->contains('id', 5)) {
            return true;
        }
        return $user->id = $package->ShipperID;


    }
    public function cancel(User $user, Package $package)
    {
        if ($user->accesses->contains('id', 6)) {
            return true;
        }
        return $user->id = $package->ShipperID && $package->status->id == 1 && $package->status->id == 2;

    }
    public function readyToShip(User $user, Package $package)
    {
        if ($user->accesses->contains('id', 14)) {
            return true;
        }
        return $user->id = $package->ShipperID && $package->status->id == 1;
    }
    public function exportLabel(User $user, Package $package)
    {
        if ($user->accesses->contains('id', 10)) {
            return true;
        }
        return $user->id = $package->ShipperID;
    }
    public function upload(User $user)
    {
        if ($user->accesses->contains('id', 1)) {
            return true;
        }
        return false;
    }


    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Package $package)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Package $package)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Package $package)
    {
        //
    }
}