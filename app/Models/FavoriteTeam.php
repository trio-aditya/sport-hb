<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteTeam extends Model
{
    protected $primaryKey = 'id_favorite_team';

    protected $fillable = [
        'user_id',
        'team_id',
        'team_name',
        'team_badge'
    ];

    //Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
