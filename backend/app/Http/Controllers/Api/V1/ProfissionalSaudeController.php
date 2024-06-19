<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\ProfissionalSaude;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfissionalSaudeController extends Controller
{
    public function index()
    {
        return response()->json(ProfissionalSaude::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required',
            'especialidade' => 'required',
            'telefone' => 'required',
            'email' => 'required',
            'senha' => 'required|min:8'
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
            'nome' => 'string',
            'cpf' => 'string',
            'especialidade' => 'string',
            'telefone' => 'string',
            'email' => 'string',
            'senha' => 'string|min=8',
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
}
