<?php

namespace App\Http\Controllers;
use App\Jobs\UploadPackageProccess;
use App\Jobs\UploadPackageProcessEm;
use App\Models\UploadHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;

class UploadPackageController extends Controller
{
    public function index()
    {

        // $shippingMethods = WorkFlow::all();
        $isEmployee = auth()->user()->isEmployee();
        $uploads =[];
        if($isEmployee){

            $uploads = UploadHistory::where('ShipmentProviderId', auth()->user()->CurrentShipmentProvider)->with('owner', 'shipmentProvider', 'status')->paginate(10);
        }
        else{
            $uploads = UploadHistory::where('ShipmentProviderId', auth()->user()->CurrentShipmentProvider)->where('CreatedBy',auth()->id())->with('owner', 'shipmentProvider', 'status')->paginate(10);
        }
        // hub,createdBy, CreatedAt status
        return inertia('Packages/Upload', [
            'uploads' => $uploads,
            'isEmployee' => $isEmployee
        ]);
    }
    public function upload(Request $req)
    {
        $validate = $req->validate([
            'file' => 'required|mimes:csv,txt'
        ]);
        $uploadHistory = new UploadHistory;
        if ($validate['file']) {
            $fileName = time() . '_' . $req->file->getClientOriginalName();
            $filePath = $req->file('file')->storeAs('uploads', $fileName, 'public');
            // dd(Storage::disk('public')->get($filePath));
            $uploadHistory->LogFile = $fileName;
            $file = $validate['file'];
            $uploadHistory->TotalPackage = count(file($validate['file'], FILE_SKIP_EMPTY_LINES)) - 1;
            $uploadHistory->PackageSuccess = 0;
            $uploadHistory->PackageFailure = 0;
            $uploadHistory->StatusID = 1;
            $uploadHistory->ShipmentProviderId = auth()->user()->CurrentShipmentProvider;
            $uploadHistory->UploadID = (string) Str::uuid();
            $uploadHistory->CreatedBy = auth()->id();
            $uploadHistory->Status = false;
            $uploadHistory->save();
            $batch = Bus::batch([
                new UploadPackageProccess($filePath, $uploadHistory),
            ])->dispatch();
            // dd($batch);
            return back()
                ->with([
                    'type' => 'success',
                    'message' => 'File has been uploaded.'
                ]);
            // ->with('file', $fileName);
        }
        return back()
            ->with([
                'type' => 'error',
                'message' => 'Error Occured'
            ]);
        # code...
    }
    public function uploadEm(Request $req)
    {
        $validate = $req->validate([
            'file' => 'required|mimes:csv,txt'
        ]);
        $uploadHistory = new UploadHistory;
        if ($validate['file']) {
            $fileName = time() . '_' . $req->file->getClientOriginalName();
            $filePath = $req->file('file')->storeAs('uploads', $fileName, 'public');
            // dd(Storage::disk('public')->get($filePath));
            $uploadHistory->LogFile = $fileName;
            $file = $validate['file'];
            $uploadHistory->TotalPackage = count(file($validate['file'], FILE_SKIP_EMPTY_LINES)) - 1;
            $uploadHistory->PackageSuccess = 0;
            $uploadHistory->PackageFailure = 0;
            $uploadHistory->StatusID = 1;
            $uploadHistory->ShipmentProviderId = auth()->user()->CurrentShipmentProvider;
            $uploadHistory->UploadID = (string) Str::uuid();
            $uploadHistory->CreatedBy = auth()->id();
            $uploadHistory->Status = false;
            $uploadHistory->save();
            $batch = Bus::batch([
                new UploadPackageProcessEm($filePath, $uploadHistory),
            ])->dispatch();
            // dd($batch);
            return back()
                ->with([
                    'type' => 'success',
                    'message' => 'File has been uploaded.'
                ]);
            // ->with('file', $fileName);
        }
        return back()
            ->with([
                'type' => 'error',
                'message' => 'Error Occured'
            ]);
        # code...
    }
}