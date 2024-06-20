<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index()
    {
        return response()->json(Agendamento::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'responsavel_id' => 'required|exists:responsavels,id',
            'profissional_saude_id' => 'required|exists:profissional_saudes,id',
            'idoso_id' => 'required|exists:idosos,id',
            'data_hora' => 'required|date',
            'status' => 'required|string',
        ]);

        $agendamento = Agendamento::create($request->all());

        return response()->json($agendamento, 201);
    }

    public function show($id)
    {
        $agendamento = Agendamento::findOrFail($id);
        return response()->json($agendamento, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'responsavel_id' => 'exists:responsavels,id',
            'profissional_saude_id' => 'exists:profissional_saudes,id',
            'idoso_id' => 'exists:idosos,id',
            'data_hora' => 'date',
            'status' => 'string',
        ]);

        $agendamento = Agendamento::findOrFail($id);
        $agendamento->update($request->all());

        return response()->json($agendamento, 200);
    }

    public function destroy($id)
    {
        $agendamento = Agendamento::findOrFail($id);
        $agendamento->delete();

        return response()->json(null, 204);
    }
}
