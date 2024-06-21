<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Alerta;
use Illuminate\Http\Request;

class AlertaController extends Controller
{
    public function index()
    {
        $alertas = Alerta::with(['idoso', 'vacina'])->get();
        return response()->json($alertas, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idoso_id' => 'required|exists:idosos,id',
            'vacina_id' => 'required|exists:vacinas,id',
            'data_alvo' => 'required|date',
        ]);

        $alerta = Alerta::create($request->all());

        return response()->json($alerta, 201);
    }

    public function show($id)
    {
        $alerta = Alerta::with(['idoso', 'vacina'])->findOrFail($id);
        return response()->json($alerta, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'idoso_id' => 'exists:idosos,id',
            'vacina_id' => 'exists:vacinas,id',
            'data_alvo' => 'date',
            'lido' => 'boolean',
        ]);

        $alerta = Alerta::findOrFail($id);
        $alerta->update($request->all());

        return response()->json($alerta, 200);
    }

    public function destroy($id)
    {
        $alerta = Alerta::findOrFail($id);
        $alerta->delete();

        return response()->json(null, 204);
    }
}
