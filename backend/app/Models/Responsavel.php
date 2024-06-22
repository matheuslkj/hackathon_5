<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Responsavel extends Model
{
    use HasFactory;

    protected $table = 'responsavels';
    protected $fillable = ['nome', 'cpf', 'senha', 'telefone', 'endereco', 'id_idoso'];
}
