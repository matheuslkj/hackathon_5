<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\ProfissionalSaude;
use Illuminate\Http\Request;

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
        ]);

        $profissionalSaude = ProfissionalSaude::create($request->all());

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
        ]);

        $profissionalSaude = ProfissionalSaude::findOrFail($id);
        $profissionalSaude->update($request->all());

        return response()->json($profissionalSaude, 200);
    }

    public function destroy($id)
    {
        $profissionalSaude = ProfissionalSaude::findOrFail($id);
        $profissionalSaude->delete();

        return response()->json(null, 204);
    }
}
