<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ResponsaveisCollection;
use App\Http\Resources\V1\ResponsaveisResource;
use App\Models\Responsavel;

use Illuminate\Http\Request;

class ResponsavelController extends Controller
{
    public function index()
    {
        return new ResponsaveisCollection(Responsavel::all());
    }

    public function store(Request $request)
    {
        Responsavel::create($request->all());
        return response()->json("Responsavel Criado");
    }

    public function show(Responsavel $responsavel)
    {
        return new ResponsaveisResource($responsavel);
    }

    public function update(Request $request, $id)
    {
        $responsavel = Responsavel::findOrFail($id);
        $responsavel->update($request->all());

        return $responsavel;
    }

    public function destroy(Responsavel $responsavel)
    {
        $responsavel->delete();
        return response()->json("Responsavel deletado");
    }
}
