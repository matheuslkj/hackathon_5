<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'responsavel_id',
        'profissional_saude_id',
        'idoso_id',
        'data_hora',
        'status',
    ];

    public function responsavel()
    {
        return $this->belongsTo(Responsavel::class);
    }

    public function profissionalSaude()
    {
        return $this->belongsTo(ProfissionalSaude::class);
    }

    public function idoso()
    {
        return $this->belongsTo(Idoso::class);
    }
}
