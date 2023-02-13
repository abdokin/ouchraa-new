<?php

namespace App\Jobs;

use App\Exports\ErrorUploadPackageExport;
use App\Imports\TPLUpload;
use ErrorException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadHubProccess implements ShouldQueue
{
    use \Illuminate\Bus\Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $file;
    public function __construct($file)
    {
        $this->file = $file;
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
            \Maatwebsite\Excel\Facades\Excel::import(new TPLUpload, $this->file, 'public');
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            // handle it later
            $failures = $e->failures();
            $error = "";
            foreach ($failures as $failure) {
                $er = $failure->errors();
                // $values =$failure->values();
                foreach ($er as $e) {
                    $error = $error . "--" . $e;
                }
                $row = $failure->values();
                $row['error'] = $error;

            }

            array_push($failedData, $row);
        }

        $head = [
            'Hub',
            'TrackingNumber',
            'ERRORS'
        ];
        array_unshift($failedData, $head);
        // $date = now()->format('Y-m-d-H-i-s-ms');
        $export = new ErrorUploadPackageExport($failedData);
        \Maatwebsite\Excel\Facades\Excel::store($export, $this->file, 'public');
    }
}