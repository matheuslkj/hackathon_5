<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Responsavel extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'nome',
        'cpf',
        'telefone',
        'endereco',
        'senha',
        'idoso_id',
    ];

    public function idoso()
    {
        return $this->belongsTo(Idoso::class);
    }
}

