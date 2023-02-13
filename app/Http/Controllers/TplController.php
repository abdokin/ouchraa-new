<?php

namespace App\Http\Controllers;

use App\Imports\TPLUpload;
use App\Jobs\UploadHubProccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;

class TplController extends Controller
{
    public function upload(Request $request)
    {
        $validate = $request->validate([
            'file' => 'required|mimes:csv,txt'
        ]);
        $fileName = time() . '_' . $request->file->getClientOriginalName();


        $filePath = $request->file('file')->storeAs('uploads', $fileName, 'public');
        $batch = Bus::batch([
            new UploadHubProccess($filePath)
        ])->dispatch();
        return back()
            ->with([
                'type' => 'success',
                'message' => 'Uploaded'
            ]);
    }
}