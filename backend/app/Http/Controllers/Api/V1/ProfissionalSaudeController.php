<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\ProfissionalSaude;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ProfissionalSaudeController extends Controller
{
    public function index()
    {
        return response()->json(ProfissionalSaude::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|unique:profissional_saudes,cpf',
            'especialidade' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:profissional_saudes,email',
            'senha' => 'required|string|min:8'
        ]);

        $data = $request->all();
        $data['senha'] = Hash::make($request->senha);

        $profissionalSaude = ProfissionalSaude::create($data);

        return response()->json($profissionalSaude, 201);
    }

    public function show($id)
    {
        $profissionalSaude = ProfissionalSaude::findOrFail($id);
        return response()->json($profissionalSaude, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'sometimes|string|max:255',
            'cpf' => 'sometimes|string|max:255|unique:profissional_saudes,cpf,' . $id,
            'especialidade' => 'sometimes|string|max:255',
            'telefone' => 'sometimes|string|max:20',
            'email' => 'sometimes|string|email|max:255|unique:profissional_saudes,email,' . $id,
            'senha' => 'sometimes|string|min:8',
        ]);

        $profissionalSaude = ProfissionalSaude::findOrFail($id);
        $data = $request->all();

        if ($request->has('senha')) {
            $data['senha'] = Hash::make($request->senha);
        }

        $profissionalSaude->update($data);

        return response()->json($profissionalSaude, 200);
    }

    public function destroy($id)
    {
        $profissionalSaude = ProfissionalSaude::findOrFail($id);
        $profissionalSaude->delete();

        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $request->validate([
            'cpf' => 'required|string',
            'senha' => 'required|string'
        ]);

        $profissionalSaude = ProfissionalSaude::where('cpf', $request->cpf)->first();

        if (!$profissionalSaude || !Hash::check($request->senha, $profissionalSaude->senha)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = $profissionalSaude->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }
}
