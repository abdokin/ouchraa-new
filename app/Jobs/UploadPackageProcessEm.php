<?php

namespace App\Jobs;

use App\Exports\ErrorUploadPackageExport;
use App\Exports\PackageExport;
use App\Imports\PackageImport;
use App\Imports\PackageImportEm;
use App\Models\UploadHistory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadPackageProcessEm implements ShouldQueue
{
    use \Illuminate\Bus\Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $uploadFile;
    public $uploadHistory;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $uploadFile, UploadHistory $uploadHistory)
    {
        $this->uploadFile = $uploadFile;
        $this->uploadHistory = $uploadHistory;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $failedData = [];
        try {
            \Maatwebsite\Excel\Facades\Excel::import(new PackageImportEm($this->uploadHistory), $this->uploadFile, 'public');
            $this->uploadHistory->StatusID = 18;

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();
            $error = "";
            $this->uploadHistory->PackageFailure += 1;
            foreach ($failures as $failure) {
                $er = $failure->errors();
                // $values =$failure->values();
                foreach ($er as $e) {
                    $error = $error . "--" . $e;
                }
                $row = $failure->values();
                $row['error'] = $error;

            }
            $this->uploadHistory->StatusID = 18;

            array_push($failedData, $row);

        }
        $this->uploadHistory->Status = true;

        $this->uploadHistory->update();

        $head = [
            'Shipper_Name',
            'Reference',
            'Customer_Name',
            'Customer_Phone',
            'Customer_Email',
            'Customer_Address',
            'Customer_City',
            'Latitude',
            'Longitude',
            'Shipping_Method',
            'Amount_To_Collect',
            'Weight',
            'Declared_Value',
            'Fragile',
            'Proof_Distributed_Object',
            'Product_Description',
            'Check_Package',
            'ERRORS'

        ];
        array_unshift($failedData, $head);
        $date = now()->format('Y-m-d-H-i-s-ms');

        $export = new ErrorUploadPackageExport($failedData);
        \Maatwebsite\Excel\Facades\Excel::store($export, $this->uploadFile, 'public');
    }
}