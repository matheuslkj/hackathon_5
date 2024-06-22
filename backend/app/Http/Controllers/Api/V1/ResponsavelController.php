<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Responsavel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResponsavelController extends Controller
{
    public function index()
    {
        $responsaveis = Responsavel::all();
        return response()->json($responsaveis, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|unique:responsavels,cpf',
            'telefone' => 'required|string|max:20',
            'endereco' => 'required|string',
            'senha' => 'required|string|min:8',
            'idoso_id' => 'required|exists:idosos,id'
        ]);

        $data = $request->all();
        $data['senha'] = Hash::make($request->senha);

        $responsavel = Responsavel::create($data);

        return response()->json($responsavel, 201);
    }

    public function show($id)
    {
        $responsavel = Responsavel::findOrFail($id);
        return response()->json($responsavel, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'sometimes|string|max:255',
            'cpf' => 'sometimes|string|max:255|unique:responsavels,cpf,' . $id,
            'telefone' => 'sometimes|string|max:20',
            'endereco' => 'sometimes|string',
            'senha' => 'sometimes|string|min:8',
            'idoso_id' => 'sometimes|exists:idosos,id'
        ]);

        $responsavel = Responsavel::findOrFail($id);
        $data = $request->all();

        if ($request->has('senha')) {
            $data['senha'] = Hash::make($request->senha);
        }

        $responsavel->update($data);

        return response()->json($responsavel, 200);
    }

    public function destroy($id)
    {
        $responsavel = Responsavel::findOrFail($id);
        $responsavel->delete();

        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $request->validate([
            'cpf' => 'required|string',
            'senha' => 'required|string'
        ]);

        $responsavel = Responsavel::where('cpf', $request->cpf)->first();

        if (!$responsavel || !Hash::check($request->senha, $responsavel->senha)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = $responsavel->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }
}
