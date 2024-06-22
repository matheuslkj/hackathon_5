<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ResponsaveisCollection;
use App\Http\Resources\V1\ResponsaveisResource;
use App\Models\Responsavel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class ResponsavelController extends Controller
{
    public function index()
    {
        return response()->json(Responsavel::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|unique:responsavels,cpf',
            'telefone' => 'required|string|max:20',
            'endereco'  => 'required|string',
            'senha' => 'required|string|min:8'
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
