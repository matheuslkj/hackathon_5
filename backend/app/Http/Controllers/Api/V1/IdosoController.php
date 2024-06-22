<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Idoso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class IdosoController extends Controller
{
    public function index()
    {
        return response()->json(Idoso::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'nascimento' => 'required|date',
            'endereco'  => 'required|string',
            'telefone' => 'required|string|max:20',
            'historico_medica' => 'required|string',
            'cpf' => 'required|string|unique:idosos,cpf'
        ]);

        $data = $request->all();
        
        $idoso = Idoso::create($data);

        return response()->json($idoso, 201);
    }

    public function show($id)
    {
        $idoso = Idoso::findOrFail($id);
        return response()->json($idoso, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'sometimes|string|max:255',
            'nascimento' => 'sometimes|date',
            'endereco' => 'sometimes|string|max:255',
            'telefone' => 'sometimes|string|max:20',
            'historico_medico' => 'sometimes|string|max:20',
            'cpf' => 'sometimes|string|max:255|unique:idosos,cpf,' . $id,
        ]);

        $idoso = Idoso::findOrFail($id);
        $data = $request->all();

        $idoso->update($data);

        return response()->json($idoso, 200);
    }

    public function destroy($id)
    {
        $idoso = Idoso::findOrFail($id);
        $idoso->delete();

        return response()->json("Idoso deletado");
    }
}
