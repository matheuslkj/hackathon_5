<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class ProfissionalSaude extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'nome',
        'cpf',
        'especialidade',
        'telefone',
        'email',
        'senha'
    ];
}
