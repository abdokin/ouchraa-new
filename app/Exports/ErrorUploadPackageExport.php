<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ErrorUploadPackageExport implements FromArray
{
    // use Exportable;

    protected $errorPackage;

    public function __construct(array $errorPackage)
    {
        $this->errorPackage = $errorPackage;
    }

    public function array(): array
    {
        // $erros= [$head, ...$this->errorPackage];
        // dd($erros);
        // var_dump($erros);
        // array_unshift($this->errorPackage,$head);
        return $this->errorPackage;
    }

}