<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idoso extends Model
{
    use HasFactory;

    protected $table = 'idosos';
    protected $fillable = ['nome', 'nascimento', 'endereco', 'telefone', 'historico_medico', 'cpf'];
}
