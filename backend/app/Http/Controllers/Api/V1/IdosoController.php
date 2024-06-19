<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\IdososCollection;
use App\Http\Resources\V1\IdososResource;
use App\Models\Idoso;
use Illuminate\Http\Request;

class IdosoController extends Controller
{
    public function index()
    {
        return new IdososCollection(Idoso::all());
    }

    public function store(Request $request)
    {
        Idoso::create($request->all());
        return response()->json("Idoso Criado");
    }

    public function show(Idoso $idoso)
    {
        return new IdososResource($idoso);
    }

    public function update(Request $request, $id)
    {
        $idoso = Idoso::findOrFail($id);
        $idoso->update($request->all());

        return $idoso;
    }

    public function destroy(Idoso $idoso)
    {
        $idoso->delete();
        return response()->json("Idoso deletado");
    }
}
