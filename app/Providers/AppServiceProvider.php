<?php

namespace App\Providers;

use App\Models\Package;
use App\Observers\PackageObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Package::observe(PackageObserver::class);
    }
}