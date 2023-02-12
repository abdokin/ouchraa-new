<?php

// use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HubController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PickUpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadPackageController;
use App\Http\Controllers\UserController;
use App\Models\ShipmentProvider;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

    Route::apiResource('users', UserController::class);

    Route::apiResource('packages', PackageController::class);
    Route::post('packages/em', [PackageController::class, 'storeEm'])->name('package.storeEm');
    Route::post('packages/ready-to-ship/{package}', [PackageController::class, 'readyToship'])->name('package.readyToShip');
    Route::post('packages/ready-to-ships', [PackageController::class, 'readyToships'])->name('package.readyToShips');
    Route::post('packages/cancel/{package}', [PackageController::class, 'cancel'])->name('package.cancel');
    Route::post('packages/cancels', [PackageController::class, 'cancels'])->name('package.cancels');
    Route::get('packages/label/{package}', [PackageController::class, 'exportLabel'])->name('package.label');
    Route::get('labels/package', [PackageController::class, 'exportLabels'])->name('package.labels');
    Route::get('export/packages', [PackageController::class, 'export'])->name('package.export');


    Route::patch('update-em/{package}', [PackageController::class, 'updateByEm'])->name('package.updateEm');
    Route::post('change-page', [PackageController::class, 'changePageSize'])->name('package.changePage');





    Route::get('uploads-package', [UploadPackageController::class, 'index'])->name('packages.uploads');
    Route::post('uploads-package-post', [UploadPackageController::class, 'upload'])->name('packages.upload-post');
    Route::post('uploads-package-em', [UploadPackageController::class, 'uploadEm'])->name('packages.upload-em');


    Route::get('profile', ProfileController::class)->name('profile');
    //switchHub 
    Route::get('switch-hub', [HubController::class, 'index'])->name('switchHub');




    Route::post('switch-hub/{shipmentProvider}', [HubController::class, 'switchHub'])->name('hub.switch');


    // pick 
    Route::get('/pick-up/packages', [PickUpController::class, 'packages'])->name('pickup.packages');
    Route::get('/pick-up/shippers', [PickUpController::class, 'shippers'])->name('pickup.shippers');
    Route::get('/pick-up/dropoff', [PickUpController::class, 'dropoff'])->name('pickup.dropoff');

    // pick up
    Route::post('/pick-up/pickup/{package}', [PickUpController::class, 'pickup'])->name('package.pickup');
    Route::post('/pick-up/not-pickup/{package}', [PickUpController::class, 'notpickup'])->name('package.notpicked');

    // dropp
    Route::post('/pick-up/drop-off/{package}', [PickUpController::class, 'dropped'])->name('package.dropped');
    Route::post('/pick-up/not-accepted/{package}', [PickUpController::class, 'notAccepted'])->name('package.notAccepted');
    // configuration
    Route::get('/config/hubs', [ConfigurationController::class, 'hubs'])->name('config.hubs');
    Route::get('/config/cities', [ConfigurationController::class, 'cities'])->name('config.cities');
    Route::get('/config/prices', [ConfigurationController::class, 'prices'])->name('config.prices');
    Route::get('/config/sizes', [ConfigurationController::class, 'sizes'])->name('config.sizes');
    Route::post('/config/enable/{shipmentProvider}', [HubController::class, 'enable'])->name('config.hub.enable');
    Route::post('/config/enable-all', [HubController::class, 'enableAll'])->name('config.hub.enableAll');

    Route::post('/config/create-hub', [HubController::class, 'store'])->name('config.hub.create');
    Route::post('/config/update/{shipmentProvider}', [HubController::class, 'update'])->name('config.hub.update');
    Route::post('/config/autoTn/{shipmentProvider}', [HubController::class, 'autoTn'])->name('config.hub.autoTn');




});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);

    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    // Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    // Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});